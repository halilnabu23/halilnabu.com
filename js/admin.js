const connectFolderButton = document.querySelector("#connect-folder-button");
const reloadDataButton = document.querySelector("#reload-data-button");
const exportBackupButton = document.querySelector("#export-backup-button");
const saveAllButton = document.querySelector("#save-all-button");
const addProjectButton = document.querySelector("#add-project-button");
const duplicateProjectButton = document.querySelector("#duplicate-project-button");
const moveProjectUpButton = document.querySelector("#move-project-up-button");
const moveProjectDownButton = document.querySelector("#move-project-down-button");
const removeProjectButton = document.querySelector("#remove-project-button");
const projectList = document.querySelector("#project-list");
const projectSearch = document.querySelector("#project-search");
const projectFormHeading = document.querySelector("#project-form-heading");
const projectForm = document.querySelector("#project-form");
const adminStatus = document.querySelector("#admin-status");
const projectImagePreview = document.querySelector("#project-image-preview");
const projectImageUploadButton = document.querySelector("#project-image-upload-button");
const projectImageFileInput = document.querySelector("#project-image-file-input");
const heroImagePreview = document.querySelector("#hero-image-preview");
const heroImageUploadButton = document.querySelector("#hero-image-upload-button");
const heroImageFileInput = document.querySelector("#hero-image-file-input");
const lifestyleAdminList = document.querySelector("#lifestyle-admin-list");

const projectFields = {
  id: document.querySelector("#project-id-input"),
  category: document.querySelector("#project-category-input"),
  order: document.querySelector("#project-order-input"),
  link: document.querySelector("#project-link-input"),
  image: document.querySelector("#project-image-input"),
  categoryLabelDe: document.querySelector("#project-category-label-de-input"),
  titleDe: document.querySelector("#project-title-de-input"),
  descriptionDe: document.querySelector("#project-description-de-input"),
  detailDe: document.querySelector("#project-detail-de-input"),
  imageAltDe: document.querySelector("#project-image-alt-de-input"),
  toolsDe: document.querySelector("#project-tools-de-input"),
  categoryLabelEn: document.querySelector("#project-category-label-en-input"),
  titleEn: document.querySelector("#project-title-en-input"),
  descriptionEn: document.querySelector("#project-description-en-input"),
  detailEn: document.querySelector("#project-detail-en-input"),
  imageAltEn: document.querySelector("#project-image-alt-en-input"),
  toolsEn: document.querySelector("#project-tools-en-input"),
};

const heroFields = {
  path: document.querySelector("#hero-image-path-input"),
  altDe: document.querySelector("#hero-alt-de-input"),
  altEn: document.querySelector("#hero-alt-en-input"),
};

const state = {
  projects: [],
  siteContent: {
    heroPortrait: {
      src: "assets/images/hero-portrait.jpg",
      alt: {
        de: "Portrait von Khalil Nabu",
        en: "Portrait of Khalil Nabu",
      },
    },
    lifestyleProfiles: [],
  },
  selectedProjectId: null,
  directoryHandle: null,
  pendingProjectImages: new Map(),
  pendingHeroImage: null,
  pendingLifestyleImages: new Map(),
  searchQuery: "",
};

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function setStatus(message, tone = "default") {
  adminStatus.textContent = message;
  if (tone === "default") {
    adminStatus.removeAttribute("data-tone");
    return;
  }

  adminStatus.dataset.tone = tone;
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    || `project-${Date.now()}`;
}

function getFileExtension(fileName) {
  const dotIndex = fileName.lastIndexOf(".");
  if (dotIndex === -1) {
    return ".png";
  }

  return fileName.slice(dotIndex).toLowerCase();
}

function parseTools(value) {
  return value
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function formatTools(tools) {
  return (tools || []).join("\n");
}

function normalizeProjectOrders() {
  state.projects
    .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0))
    .forEach((project, index) => {
      project.order = index;
    });
}

function getSelectedProject() {
  return state.projects.find((project) => project.id === state.selectedProjectId) || null;
}

function createPreviewMarkup(path, alt = "") {
  if (!path) {
    return "<span>No image selected</span>";
  }

  return `<img src="${path}" alt="${alt}">`;
}

function renderProjectList() {
  const projects = [...state.projects]
    .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0))
    .filter((project) => {
      const query = state.searchQuery.trim().toLowerCase();
      if (!query) {
        return true;
      }

      const haystack = [
        project.id,
        project.translations?.de?.title,
        project.translations?.en?.title,
      ].join(" ").toLowerCase();

      return haystack.includes(query);
    });

  projectList.innerHTML = projects.map((project) => `
    <button class="project-list-item ${project.id === state.selectedProjectId ? "is-active" : ""}" type="button" data-project-id="${project.id}">
      <strong>${project.translations?.de?.title || project.translations?.en?.title || project.id}</strong>
      <span>${project.id}</span>
      <small>${project.category} · #${project.order}</small>
    </button>
  `).join("");

  projectList.querySelectorAll("[data-project-id]").forEach((button) => {
    button.addEventListener("click", () => selectProject(button.dataset.projectId));
  });
}

function renderProjectImagePreview(project) {
  if (!project) {
    projectImagePreview.innerHTML = "<span>No image selected</span>";
    return;
  }

  projectImagePreview.innerHTML = createPreviewMarkup(project.image, project.translations?.de?.imageAlt || project.id);
}

function fillProjectForm(project) {
  if (!project) {
    projectForm.reset();
    projectFormHeading.textContent = "Select a project";
    renderProjectImagePreview(null);
    return;
  }

  projectFormHeading.textContent = project.translations?.de?.title || project.id;
  projectFields.id.value = project.id || "";
  projectFields.category.value = project.category || "websites";
  projectFields.order.value = String(project.order ?? 0);
  projectFields.link.value = project.link || "";
  projectFields.image.value = project.image || "";
  projectFields.categoryLabelDe.value = project.translations?.de?.categoryLabel || "";
  projectFields.titleDe.value = project.translations?.de?.title || "";
  projectFields.descriptionDe.value = project.translations?.de?.description || "";
  projectFields.detailDe.value = project.translations?.de?.detail || "";
  projectFields.imageAltDe.value = project.translations?.de?.imageAlt || "";
  projectFields.toolsDe.value = formatTools(project.translations?.de?.tools);
  projectFields.categoryLabelEn.value = project.translations?.en?.categoryLabel || "";
  projectFields.titleEn.value = project.translations?.en?.title || "";
  projectFields.descriptionEn.value = project.translations?.en?.description || "";
  projectFields.detailEn.value = project.translations?.en?.detail || "";
  projectFields.imageAltEn.value = project.translations?.en?.imageAlt || "";
  projectFields.toolsEn.value = formatTools(project.translations?.en?.tools);
  renderProjectImagePreview(project);
}

function syncSelectedProjectFromForm() {
  const project = getSelectedProject();
  if (!project) {
    return;
  }

  const previousId = project.id;
  const nextId = slugify(projectFields.id.value);

  project.id = nextId;
  project.category = projectFields.category.value;
  project.order = Number(projectFields.order.value) || 0;
  project.link = projectFields.link.value.trim();
  project.image = projectFields.image.value.trim();
  project.translations.de.categoryLabel = projectFields.categoryLabelDe.value.trim();
  project.translations.de.title = projectFields.titleDe.value.trim();
  project.translations.de.description = projectFields.descriptionDe.value.trim();
  project.translations.de.detail = projectFields.detailDe.value.trim();
  project.translations.de.imageAlt = projectFields.imageAltDe.value.trim();
  project.translations.de.tools = parseTools(projectFields.toolsDe.value);
  project.translations.en.categoryLabel = projectFields.categoryLabelEn.value.trim();
  project.translations.en.title = projectFields.titleEn.value.trim();
  project.translations.en.description = projectFields.descriptionEn.value.trim();
  project.translations.en.detail = projectFields.detailEn.value.trim();
  project.translations.en.imageAlt = projectFields.imageAltEn.value.trim();
  project.translations.en.tools = parseTools(projectFields.toolsEn.value);

  if (previousId !== nextId) {
    if (state.pendingProjectImages.has(previousId)) {
      state.pendingProjectImages.set(nextId, state.pendingProjectImages.get(previousId));
      state.pendingProjectImages.delete(previousId);
    }
    state.selectedProjectId = nextId;
  }

  projectFormHeading.textContent = project.translations.de.title || project.id;
  renderProjectList();
  renderProjectImagePreview(project);
}

function selectProject(projectId) {
  state.selectedProjectId = projectId;
  fillProjectForm(getSelectedProject());
  renderProjectList();
}

function addProject() {
  normalizeProjectOrders();
  const newProject = {
    id: `new-project-${state.projects.length + 1}`,
    order: state.projects.length,
    category: "websites",
    image: "",
    link: "",
    translations: {
      de: {
        categoryLabel: "Website",
        title: "Neues Projekt",
        description: "",
        detail: "",
        imageAlt: "",
        tools: [],
      },
      en: {
        categoryLabel: "Website",
        title: "New Project",
        description: "",
        detail: "",
        imageAlt: "",
        tools: [],
      },
    },
  };

  state.projects.push(newProject);
  selectProject(newProject.id);
  setStatus("New project created. Fill in the details and save your changes.", "success");
}

function duplicateProject() {
  const project = getSelectedProject();
  if (!project) {
    setStatus("Select a project before duplicating it.", "warning");
    return;
  }

  normalizeProjectOrders();
  const duplicate = deepClone(project);
  duplicate.id = `${project.id}-copy`;
  duplicate.order = project.order + 1;
  duplicate.translations.de.title = `${project.translations.de.title} Copy`;
  duplicate.translations.en.title = `${project.translations.en.title} Copy`;
  state.projects.push(duplicate);
  normalizeProjectOrders();
  selectProject(duplicate.id);
  setStatus("Project duplicated. Review the copy and save when ready.", "success");
}

function moveSelectedProject(direction) {
  const project = getSelectedProject();
  if (!project) {
    setStatus("Select a project first.", "warning");
    return;
  }

  normalizeProjectOrders();
  const orderedProjects = [...state.projects].sort((a, b) => a.order - b.order);
  const currentIndex = orderedProjects.findIndex((item) => item.id === project.id);
  const targetIndex = currentIndex + direction;

  if (targetIndex < 0 || targetIndex >= orderedProjects.length) {
    return;
  }

  const currentProject = orderedProjects[currentIndex];
  const targetProject = orderedProjects[targetIndex];
  const tempOrder = currentProject.order;
  currentProject.order = targetProject.order;
  targetProject.order = tempOrder;
  normalizeProjectOrders();
  renderProjectList();
  fillProjectForm(getSelectedProject());
}

function removeSelectedProject() {
  const project = getSelectedProject();
  if (!project) {
    setStatus("Select a project before removing it.", "warning");
    return;
  }

  if (!window.confirm(`Remove "${project.translations.de.title || project.id}" from the project list?`)) {
    return;
  }

  state.projects = state.projects.filter((item) => item.id !== project.id);
  state.pendingProjectImages.delete(project.id);
  normalizeProjectOrders();
  state.selectedProjectId = state.projects[0]?.id || null;
  fillProjectForm(getSelectedProject());
  renderProjectList();
  setStatus("Project removed. Save changes to update the site data.", "success");
}

function fillHeroSection() {
  const hero = state.siteContent.heroPortrait;
  heroFields.path.value = hero.src || "";
  heroFields.altDe.value = hero.alt?.de || "";
  heroFields.altEn.value = hero.alt?.en || "";
  heroImagePreview.innerHTML = createPreviewMarkup(hero.src, hero.alt?.de || hero.alt?.en || "Hero portrait");
}

function syncHeroSection() {
  state.siteContent.heroPortrait.src = heroFields.path.value.trim();
  state.siteContent.heroPortrait.alt.de = heroFields.altDe.value.trim();
  state.siteContent.heroPortrait.alt.en = heroFields.altEn.value.trim();
  heroImagePreview.innerHTML = createPreviewMarkup(
    state.siteContent.heroPortrait.src,
    state.siteContent.heroPortrait.alt.de || state.siteContent.heroPortrait.alt.en || "Hero portrait",
  );
}

function renderLifestyleAdmin() {
  lifestyleAdminList.innerHTML = state.siteContent.lifestyleProfiles.map((profile) => `
    <article class="lifestyle-card" data-lifestyle-id="${profile.id}">
      <div class="lifestyle-card-header">
        <strong>${profile.label.de || profile.id}</strong>
        <small>${profile.id}</small>
      </div>

      <div class="lifestyle-grid">
        <div>
          <label>
            <span>Label (DE)</span>
            <input type="text" data-lifestyle-field="label-de" value="${profile.label.de || ""}">
          </label>
          <label>
            <span>Detail (DE)</span>
            <textarea rows="5" data-lifestyle-field="detail-de">${profile.detail.de || ""}</textarea>
          </label>
        </div>
        <div>
          <label>
            <span>Label (EN)</span>
            <input type="text" data-lifestyle-field="label-en" value="${profile.label.en || ""}">
          </label>
          <label>
            <span>Detail (EN)</span>
            <textarea rows="5" data-lifestyle-field="detail-en">${profile.detail.en || ""}</textarea>
          </label>
        </div>
      </div>

      <div class="collage-edit-grid">
        ${profile.collage.slice(0, 3).map((item, index) => `
          <div class="collage-slot" data-collage-index="${index}">
            <div class="collage-slot-preview" id="collage-preview-${profile.id}-${index}">
              ${createPreviewMarkup(item.image, item.alt || `${profile.id} image ${index + 1}`)}
            </div>
            <label>
              <span>Image Path</span>
              <input type="text" data-lifestyle-field="image-path" data-collage-index="${index}" value="${item.image || ""}">
            </label>
            <label>
              <span>Image Alt</span>
              <input type="text" data-lifestyle-field="image-alt" data-collage-index="${index}" value="${item.alt || ""}">
            </label>
            <button class="admin-button admin-button-small" type="button" data-lifestyle-upload="${index}">Upload Image</button>
            <input type="file" accept="image/*" hidden data-lifestyle-file="${index}">
          </div>
        `).join("")}
      </div>
    </article>
  `).join("");

  lifestyleAdminList.querySelectorAll("[data-lifestyle-field]").forEach((field) => {
    field.addEventListener("input", () => {
      const card = field.closest("[data-lifestyle-id]");
      const profile = state.siteContent.lifestyleProfiles.find((item) => item.id === card.dataset.lifestyleId);
      if (!profile) {
        return;
      }

      const fieldType = field.dataset.lifestyleField;
      const collageIndex = Number(field.dataset.collageIndex);

      if (fieldType === "label-de") profile.label.de = field.value;
      if (fieldType === "label-en") profile.label.en = field.value;
      if (fieldType === "detail-de") profile.detail.de = field.value;
      if (fieldType === "detail-en") profile.detail.en = field.value;
      if (fieldType === "image-path" && Number.isInteger(collageIndex)) {
        profile.collage[collageIndex].image = field.value.trim();
      }
      if (fieldType === "image-alt" && Number.isInteger(collageIndex)) {
        profile.collage[collageIndex].alt = field.value.trim();
      }

      const preview = card.querySelector(`#collage-preview-${profile.id}-${collageIndex}`);
      if (preview && Number.isInteger(collageIndex)) {
        preview.innerHTML = createPreviewMarkup(profile.collage[collageIndex].image, profile.collage[collageIndex].alt);
      }
    });
  });

  lifestyleAdminList.querySelectorAll("[data-lifestyle-upload]").forEach((button) => {
    button.addEventListener("click", () => {
      const fileInput = button.parentElement.querySelector("[data-lifestyle-file]");
      fileInput?.click();
    });
  });

  lifestyleAdminList.querySelectorAll("[data-lifestyle-file]").forEach((input) => {
    input.addEventListener("change", () => {
      const file = input.files?.[0];
      if (!file) {
        return;
      }

      const card = input.closest("[data-lifestyle-id]");
      const profile = state.siteContent.lifestyleProfiles.find((item) => item.id === card.dataset.lifestyleId);
      const collageIndex = Number(input.dataset.lifestyleFile);

      if (!profile || !Number.isInteger(collageIndex)) {
        return;
      }

      const extension = getFileExtension(file.name);
      const imagePath = `assets/images/lifestyle-${slugify(profile.id)}-${collageIndex + 1}${extension}`;
      profile.collage[collageIndex].image = imagePath;
      if (!profile.collage[collageIndex].alt) {
        profile.collage[collageIndex].alt = `${profile.label.en || profile.label.de || profile.id} image ${collageIndex + 1}`;
      }

      state.pendingLifestyleImages.set(`${profile.id}:${collageIndex}`, file);
      const preview = card.querySelector(`#collage-preview-${profile.id}-${collageIndex}`);
      const pathInput = card.querySelector(`[data-lifestyle-field="image-path"][data-collage-index="${collageIndex}"]`);
      const altInput = card.querySelector(`[data-lifestyle-field="image-alt"][data-collage-index="${collageIndex}"]`);
      if (pathInput) pathInput.value = imagePath;
      if (altInput) altInput.value = profile.collage[collageIndex].alt;
      if (preview) preview.innerHTML = createPreviewMarkup(URL.createObjectURL(file), profile.collage[collageIndex].alt);
      setStatus(`Selected a new image for ${profile.label.de || profile.id}. Save changes to copy it into the project.`, "success");
    });
  });
}

function renderAdmin() {
  normalizeProjectOrders();
  renderProjectList();
  fillProjectForm(getSelectedProject());
  fillHeroSection();
  renderLifestyleAdmin();
}

async function loadPublishedData() {
  const [projectsResponse, siteResponse] = await Promise.all([
    fetch("data/projects.json", { cache: "no-store" }),
    fetch("data/site-content.json", { cache: "no-store" }),
  ]);

  if (!projectsResponse.ok || !siteResponse.ok) {
    throw new Error("Could not load site data.");
  }

  const [projectsData, siteContentData] = await Promise.all([
    projectsResponse.json(),
    siteResponse.json(),
  ]);

  state.projects = deepClone(projectsData.projects || []);
  state.siteContent = deepClone(siteContentData);
  state.selectedProjectId = state.projects[0]?.id || null;
}

async function readJsonFromDirectory(relativePath) {
  const segments = relativePath.split("/");
  let directoryHandle = state.directoryHandle;

  for (const segment of segments.slice(0, -1)) {
    directoryHandle = await directoryHandle.getDirectoryHandle(segment);
  }

  const fileHandle = await directoryHandle.getFileHandle(segments.at(-1));
  const file = await fileHandle.getFile();
  return JSON.parse(await file.text());
}

async function getDirectoryHandle(relativeDirectory, create = false) {
  const segments = relativeDirectory.split("/").filter(Boolean);
  let directoryHandle = state.directoryHandle;

  for (const segment of segments) {
    directoryHandle = await directoryHandle.getDirectoryHandle(segment, { create });
  }

  return directoryHandle;
}

async function writeTextFile(relativePath, content) {
  const segments = relativePath.split("/");
  const directoryHandle = await getDirectoryHandle(segments.slice(0, -1).join("/"), true);
  const fileHandle = await directoryHandle.getFileHandle(segments.at(-1), { create: true });
  const writable = await fileHandle.createWritable();
  await writable.write(content);
  await writable.close();
}

async function writeBinaryFile(relativePath, file) {
  const segments = relativePath.split("/");
  const directoryHandle = await getDirectoryHandle(segments.slice(0, -1).join("/"), true);
  const fileHandle = await directoryHandle.getFileHandle(segments.at(-1), { create: true });
  const writable = await fileHandle.createWritable();
  await writable.write(await file.arrayBuffer());
  await writable.close();
}

async function connectProjectFolder() {
  if (!window.showDirectoryPicker) {
    setStatus("Your browser does not support direct folder access. Use the latest Edge or Chrome on your computer.", "error");
    return;
  }

  try {
    state.directoryHandle = await window.showDirectoryPicker({ id: "khalil-nabu-portfolio" });
    const [projectsData, siteContentData] = await Promise.all([
      readJsonFromDirectory("data/projects.json"),
      readJsonFromDirectory("data/site-content.json"),
    ]);

    state.projects = deepClone(projectsData.projects || []);
    state.siteContent = deepClone(siteContentData);
    state.selectedProjectId = state.projects[0]?.id || null;
    renderAdmin();
    setStatus("Project folder connected. You can now save directly into the local portfolio files.", "success");
  } catch (error) {
    console.error(error);
    setStatus("Folder connection was cancelled or the selected folder does not contain the expected data files.", "warning");
  }
}

async function reloadData() {
  try {
    if (state.directoryHandle) {
      const [projectsData, siteContentData] = await Promise.all([
        readJsonFromDirectory("data/projects.json"),
        readJsonFromDirectory("data/site-content.json"),
      ]);
      state.projects = deepClone(projectsData.projects || []);
      state.siteContent = deepClone(siteContentData);
      state.selectedProjectId = state.projects[0]?.id || null;
      renderAdmin();
      setStatus("Reloaded data from the connected local folder.", "success");
      return;
    }

    await loadPublishedData();
    renderAdmin();
    setStatus("Reloaded data from the current static site.", "success");
  } catch (error) {
    console.error(error);
    setStatus("Could not reload data.", "error");
  }
}

async function saveAllChanges() {
  syncSelectedProjectFromForm();
  syncHeroSection();

  if (!state.directoryHandle) {
    setStatus("Connect your local project folder first. Saving directly into files only works after folder access is granted.", "error");
    return;
  }

  try {
    if (state.pendingHeroImage) {
      const extension = getFileExtension(state.pendingHeroImage.name);
      const heroPath = `assets/images/hero-portrait${extension}`;
      await writeBinaryFile(heroPath, state.pendingHeroImage);
      state.siteContent.heroPortrait.src = heroPath;
      state.pendingHeroImage = null;
    }

    for (const [projectId, file] of state.pendingProjectImages.entries()) {
      const project = state.projects.find((item) => item.id === projectId);
      if (!project) {
        continue;
      }

      const extension = getFileExtension(file.name);
      const filePath = `assets/projects/${slugify(project.id)}${extension}`;
      await writeBinaryFile(filePath, file);
      project.image = filePath;
    }
    state.pendingProjectImages.clear();

    for (const [key, file] of state.pendingLifestyleImages.entries()) {
      const [profileId, collageIndex] = key.split(":");
      const profile = state.siteContent.lifestyleProfiles.find((item) => item.id === profileId);
      const index = Number(collageIndex);
      if (!profile || !Number.isInteger(index)) {
        continue;
      }

      const extension = getFileExtension(file.name);
      const filePath = `assets/images/lifestyle-${slugify(profile.id)}-${index + 1}${extension}`;
      await writeBinaryFile(filePath, file);
      profile.collage[index].image = filePath;
    }
    state.pendingLifestyleImages.clear();

    normalizeProjectOrders();
    const projectsPayload = { projects: [...state.projects].sort((a, b) => a.order - b.order) };
    await writeTextFile("data/projects.json", `${JSON.stringify(projectsPayload, null, 2)}\n`);
    await writeTextFile("data/site-content.json", `${JSON.stringify(state.siteContent, null, 2)}\n`);

    fillProjectForm(getSelectedProject());
    fillHeroSection();
    renderLifestyleAdmin();
    setStatus("Saved projects.json, site-content.json and any newly uploaded images into your local project folder.", "success");
  } catch (error) {
    console.error(error);
    setStatus("Saving failed. Make sure you selected the real project folder and that the browser still has access to it.", "error");
  }
}

function downloadBackupJson() {
  syncSelectedProjectFromForm();
  syncHeroSection();

  const backupPayload = {
    generatedAt: new Date().toISOString(),
    projects: [...state.projects].sort((a, b) => a.order - b.order),
    siteContent: state.siteContent,
  };

  const blob = new Blob([JSON.stringify(backupPayload, null, 2)], { type: "application/json" });
  const anchor = document.createElement("a");
  anchor.href = URL.createObjectURL(blob);
  anchor.download = `khalil-nabu-admin-backup-${Date.now()}.json`;
  anchor.click();
  URL.revokeObjectURL(anchor.href);
  setStatus("Backup JSON downloaded.", "success");
}

projectForm.addEventListener("input", syncSelectedProjectFromForm);
projectSearch.addEventListener("input", () => {
  state.searchQuery = projectSearch.value;
  renderProjectList();
});

connectFolderButton.addEventListener("click", connectProjectFolder);
reloadDataButton.addEventListener("click", reloadData);
exportBackupButton.addEventListener("click", downloadBackupJson);
saveAllButton.addEventListener("click", saveAllChanges);
addProjectButton.addEventListener("click", addProject);
duplicateProjectButton.addEventListener("click", duplicateProject);
moveProjectUpButton.addEventListener("click", () => moveSelectedProject(-1));
moveProjectDownButton.addEventListener("click", () => moveSelectedProject(1));
removeProjectButton.addEventListener("click", removeSelectedProject);

projectImageUploadButton.addEventListener("click", () => projectImageFileInput.click());
projectImageFileInput.addEventListener("change", () => {
  const project = getSelectedProject();
  const file = projectImageFileInput.files?.[0];
  if (!project || !file) {
    return;
  }

  const extension = getFileExtension(file.name);
  const imagePath = `assets/projects/${slugify(project.id)}${extension}`;
  project.image = imagePath;
  projectFields.image.value = imagePath;
  state.pendingProjectImages.set(project.id, file);
  projectImagePreview.innerHTML = createPreviewMarkup(URL.createObjectURL(file), project.translations.de.imageAlt || project.id);
  setStatus("Cover image selected. Save changes to copy it into assets/projects.", "success");
});

heroFields.path.addEventListener("input", syncHeroSection);
heroFields.altDe.addEventListener("input", syncHeroSection);
heroFields.altEn.addEventListener("input", syncHeroSection);

heroImageUploadButton.addEventListener("click", () => heroImageFileInput.click());
heroImageFileInput.addEventListener("change", () => {
  const file = heroImageFileInput.files?.[0];
  if (!file) {
    return;
  }

  const extension = getFileExtension(file.name);
  const imagePath = `assets/images/hero-portrait${extension}`;
  state.siteContent.heroPortrait.src = imagePath;
  heroFields.path.value = imagePath;
  state.pendingHeroImage = file;
  heroImagePreview.innerHTML = createPreviewMarkup(URL.createObjectURL(file), state.siteContent.heroPortrait.alt.de || "Hero portrait");
  setStatus("Hero image selected. Save changes to copy it into assets/images.", "success");
});

async function initializeAdmin() {
  try {
    await loadPublishedData();
    renderAdmin();
    setStatus("Published data loaded. Connect the local project folder when you want to save directly into your files.", "success");
  } catch (error) {
    console.error(error);
    setStatus("Could not load the current JSON files. Make sure data/projects.json and data/site-content.json exist.", "error");
  }
}

initializeAdmin();
