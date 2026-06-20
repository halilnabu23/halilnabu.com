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
const cvFilePathInput = document.querySelector("#cv-file-path-input");
const cvFileUploadButton = document.querySelector("#cv-file-upload-button");
const cvFileInput = document.querySelector("#cv-file-input");
const cvFileQuickPath = document.querySelector("#cv-file-quick-path");
const applicationFilePathInput = document.querySelector("#application-file-path-input");
const applicationFileUploadButton = document.querySelector("#application-file-upload-button");
const applicationFileInput = document.querySelector("#application-file-input");
const applicationFileQuickPath = document.querySelector("#application-file-quick-path");
const lifestyleAdminList = document.querySelector("#lifestyle-admin-list");
const githubTokenInput = document.querySelector("#github-token-input");
const rememberGitHubTokenInput = document.querySelector("#remember-github-token-input");
const githubRepoLabel = document.querySelector("#github-repo-label");
const githubBranchLabel = document.querySelector("#github-branch-label");
const connectionSummary = document.querySelector("#connection-summary");
const connectionSettings = document.querySelector("#connection-settings");
const manageGitHubConnectionButton = document.querySelector("#manage-github-connection-button");
const disconnectGitHubButton = document.querySelector("#disconnect-github-button");
const closeGitHubSettingsButton = document.querySelector("#close-github-settings-button");

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

const REPO_CONFIG = {
  owner: "halilnabu23",
  repo: "halilnabu.com",
  branch: "main",
};

const TOKEN_STORAGE_KEY = "khalil-nabu-admin-github-token";
const SESSION_TOKEN_STORAGE_KEY = "khalil-nabu-admin-github-token-session";
const siteRootUrl = new URL(`${document.documentElement.dataset.siteRoot || "."}/`, window.location.href);

const state = {
  projects: [],
  siteContent: createDefaultSiteContent(),
  selectedProjectId: null,
  directoryHandle: null,
  pendingProjectImages: new Map(),
  pendingHeroImage: null,
  pendingDocumentFiles: {
    cv: null,
    application: null,
  },
  pendingLifestyleImages: new Map(),
  searchQuery: "",
  isSaving: false,
  github: {
    token: "",
    remember: false,
    settingsOpen: false,
  },
};

function createDefaultSiteContent() {
  return {
    heroPortrait: {
      src: "assets/images/hero-portrait.jpg",
      alt: {
        de: "Portrait von Khalil Nabu",
        en: "Portrait of Khalil Nabu",
      },
    },
    documents: {
      cv: {
        src: "assets/projects/Lebenslauf-Khalil-Nabu.pdf",
        updatedAt: "",
      },
      application: {
        src: "assets/projects/Bewerbung-Khalil-Nabu.pdf",
        updatedAt: "",
      },
    },
    lifestyleProfiles: [],
  };
}

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

function setSavingState(isSaving) {
  state.isSaving = isSaving;
  saveAllButton.disabled = isSaving;
  saveAllButton.textContent = isSaving ? "Saving..." : "Save Changes";
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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

function isAbsoluteUrl(value) {
  return /^(?:[a-z]+:|\/\/)/i.test(String(value));
}

function resolveSiteUrl(relativePath) {
  if (!relativePath) {
    return "";
  }

  if (isAbsoluteUrl(relativePath)) {
    return relativePath;
  }

  return new URL(relativePath, siteRootUrl).toString();
}

function createPreviewMarkup(path, alt = "") {
  if (!path) {
    return "<span>No image selected</span>";
  }

  return `<img src="${escapeHtml(resolveSiteUrl(path))}" alt="${escapeHtml(alt)}">`;
}

function bytesToBase64(bytes) {
  let binary = "";
  const chunkSize = 0x8000;

  for (let index = 0; index < bytes.length; index += chunkSize) {
    const chunk = bytes.subarray(index, index + chunkSize);
    binary += String.fromCharCode(...chunk);
  }

  return btoa(binary);
}

function textToBase64(text) {
  return bytesToBase64(new TextEncoder().encode(text));
}

async function fileToBase64(file) {
  return bytesToBase64(new Uint8Array(await file.arrayBuffer()));
}

function normalizeSiteContent(siteContent) {
  const normalized = deepClone(siteContent || createDefaultSiteContent());

  normalized.heroPortrait = normalized.heroPortrait || createDefaultSiteContent().heroPortrait;
  normalized.heroPortrait.src = normalized.heroPortrait.src || "assets/images/hero-portrait.jpg";
  normalized.heroPortrait.alt = normalized.heroPortrait.alt || { de: "", en: "" };
  normalized.heroPortrait.alt.de = normalized.heroPortrait.alt.de || "Portrait von Khalil Nabu";
  normalized.heroPortrait.alt.en = normalized.heroPortrait.alt.en || "Portrait of Khalil Nabu";
  normalized.documents = normalized.documents || createDefaultSiteContent().documents;
  normalized.documents.cv = normalized.documents.cv || { src: "assets/projects/Lebenslauf-Khalil-Nabu.pdf", updatedAt: "" };
  normalized.documents.application = normalized.documents.application || { src: "assets/projects/Bewerbung-Khalil-Nabu.pdf", updatedAt: "" };
  normalized.documents.cv.src = normalized.documents.cv.src || "assets/projects/Lebenslauf-Khalil-Nabu.pdf";
  normalized.documents.application.src = normalized.documents.application.src || "assets/projects/Bewerbung-Khalil-Nabu.pdf";
  normalized.documents.cv.updatedAt = normalized.documents.cv.updatedAt || "";
  normalized.documents.application.updatedAt = normalized.documents.application.updatedAt || "";

  normalized.lifestyleProfiles = Array.isArray(normalized.lifestyleProfiles)
    ? normalized.lifestyleProfiles.map((profile) => ({
      id: profile.id || slugify(profile.label?.en || profile.label?.de || "lifestyle"),
      label: {
        de: profile.label?.de || "",
        en: profile.label?.en || "",
      },
      detail: {
        de: profile.detail?.de || "",
        en: profile.detail?.en || "",
      },
      collage: Array.isArray(profile.collage)
        ? profile.collage.map((item) => ({
          image: item.image || "",
          alt: item.alt || "",
        }))
        : [],
    }))
    : [];

  return normalized;
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

function loadStoredGitHubToken() {
  let token = "";
  let remember = false;

  try {
    token = localStorage.getItem(TOKEN_STORAGE_KEY) || "";
    remember = Boolean(token);
    if (!token) {
      token = sessionStorage.getItem(SESSION_TOKEN_STORAGE_KEY) || "";
    }
  } catch {
    token = "";
    remember = false;
  }

  state.github.token = token;
  state.github.remember = remember;

  githubTokenInput.value = token;
  rememberGitHubTokenInput.checked = remember;
}

function persistGitHubToken() {
  state.github.token = githubTokenInput.value.trim();
  state.github.remember = rememberGitHubTokenInput.checked;

  try {
    if (state.github.token) {
      sessionStorage.setItem(SESSION_TOKEN_STORAGE_KEY, state.github.token);
    } else {
      sessionStorage.removeItem(SESSION_TOKEN_STORAGE_KEY);
    }

    if (state.github.remember && state.github.token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, state.github.token);
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  } catch {
    // Ignore storage failures and keep the current in-memory token.
  }

  updateConnectionUi();
}

function updateConnectionUi() {
  const hasToken = Boolean(state.github.token);
  const showSettings = state.github.settingsOpen || !hasToken;

  if (connectionSummary) {
    connectionSummary.hidden = !hasToken || showSettings;
  }

  if (connectionSettings) {
    connectionSettings.hidden = !showSettings;
  }

  if (closeGitHubSettingsButton) {
    closeGitHubSettingsButton.hidden = !hasToken;
  }
}

function openGitHubSettings() {
  state.github.settingsOpen = true;
  updateConnectionUi();
  githubTokenInput.focus();
}

function closeGitHubSettings() {
  if (!state.github.token) {
    return;
  }

  state.github.settingsOpen = false;
  updateConnectionUi();
}

function disconnectGitHubToken() {
  state.github.token = "";
  state.github.remember = false;
  state.github.settingsOpen = true;
  githubTokenInput.value = "";
  rememberGitHubTokenInput.checked = false;

  try {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    sessionStorage.removeItem(SESSION_TOKEN_STORAGE_KEY);
  } catch {
    // Ignore storage cleanup failures.
  }

  updateConnectionUi();
  setStatus("GitHub token removed. Add a new token if you want to keep publishing directly to the live site.", "warning");
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
    <button class="project-list-item ${project.id === state.selectedProjectId ? "is-active" : ""}" type="button" data-project-id="${escapeHtml(project.id)}">
      <strong>${escapeHtml(project.translations?.de?.title || project.translations?.en?.title || project.id)}</strong>
      <span>${escapeHtml(project.id)}</span>
      <small>${escapeHtml(project.category)} · #${escapeHtml(project.order)}</small>
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

function fillDocumentSection() {
  const cvPath = state.siteContent.documents?.cv?.src || "";
  const applicationPath = state.siteContent.documents?.application?.src || "";

  cvFilePathInput.value = cvPath;
  applicationFilePathInput.value = applicationPath;

  if (cvFileQuickPath) {
    cvFileQuickPath.textContent = cvPath || "No file selected";
  }

  if (applicationFileQuickPath) {
    applicationFileQuickPath.textContent = applicationPath || "No file selected";
  }
}

function syncDocumentSection() {
  state.siteContent.documents.cv.src = cvFilePathInput.value.trim();
  state.siteContent.documents.application.src = applicationFilePathInput.value.trim();
  fillDocumentSection();
}

function ensureCollageItem(profile, index) {
  if (!Array.isArray(profile.collage)) {
    profile.collage = [];
  }

  if (!profile.collage[index]) {
    profile.collage[index] = {
      image: "",
      alt: "",
    };
  }

  return profile.collage[index];
}

function renderLifestyleAdmin() {
  lifestyleAdminList.innerHTML = state.siteContent.lifestyleProfiles.map((profile) => `
    <article class="lifestyle-card" data-lifestyle-id="${escapeHtml(profile.id)}">
      <div class="lifestyle-card-header">
        <strong>${escapeHtml(profile.label.de || profile.id)}</strong>
        <small>${escapeHtml(profile.id)}</small>
      </div>

      <div class="lifestyle-grid">
        <div>
          <label>
            <span>Label (DE)</span>
            <input type="text" data-lifestyle-field="label-de" value="${escapeHtml(profile.label.de || "")}">
          </label>
          <label>
            <span>Detail (DE)</span>
            <textarea rows="5" data-lifestyle-field="detail-de">${escapeHtml(profile.detail.de || "")}</textarea>
          </label>
        </div>
        <div>
          <label>
            <span>Label (EN)</span>
            <input type="text" data-lifestyle-field="label-en" value="${escapeHtml(profile.label.en || "")}">
          </label>
          <label>
            <span>Detail (EN)</span>
            <textarea rows="5" data-lifestyle-field="detail-en">${escapeHtml(profile.detail.en || "")}</textarea>
          </label>
        </div>
      </div>

      <div class="collage-edit-grid">
        ${[0, 1, 2].map((index) => {
          const item = ensureCollageItem(profile, index);

          return `
            <div class="collage-slot" data-collage-index="${index}">
              <div class="collage-slot-preview" id="collage-preview-${escapeHtml(profile.id)}-${index}">
                ${createPreviewMarkup(item.image, item.alt || `${profile.id} image ${index + 1}`)}
              </div>
              <label>
                <span>Image Path</span>
                <input type="text" data-lifestyle-field="image-path" data-collage-index="${index}" value="${escapeHtml(item.image || "")}">
              </label>
              <label>
                <span>Image Alt</span>
                <input type="text" data-lifestyle-field="image-alt" data-collage-index="${index}" value="${escapeHtml(item.alt || "")}">
              </label>
              <button class="admin-button admin-button-small" type="button" data-lifestyle-upload="${index}">Upload Image</button>
              <input type="file" accept="image/*" hidden data-lifestyle-file="${index}">
            </div>
          `;
        }).join("")}
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
        ensureCollageItem(profile, collageIndex).image = field.value.trim();
      }
      if (fieldType === "image-alt" && Number.isInteger(collageIndex)) {
        ensureCollageItem(profile, collageIndex).alt = field.value.trim();
      }

      if (Number.isInteger(collageIndex)) {
        const preview = card.querySelector(`#collage-preview-${profile.id}-${collageIndex}`);
        const collageItem = ensureCollageItem(profile, collageIndex);
        if (preview) {
          preview.innerHTML = createPreviewMarkup(collageItem.image, collageItem.alt);
        }
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

      const collageItem = ensureCollageItem(profile, collageIndex);
      const extension = getFileExtension(file.name);
      const imagePath = `assets/images/lifestyle-${slugify(profile.id)}-${collageIndex + 1}${extension}`;
      collageItem.image = imagePath;
      if (!collageItem.alt) {
        collageItem.alt = `${profile.label.en || profile.label.de || profile.id} image ${collageIndex + 1}`;
      }

      state.pendingLifestyleImages.set(`${profile.id}:${collageIndex}`, file);
      const preview = card.querySelector(`#collage-preview-${profile.id}-${collageIndex}`);
      const pathInput = card.querySelector(`[data-lifestyle-field="image-path"][data-collage-index="${collageIndex}"]`);
      const altInput = card.querySelector(`[data-lifestyle-field="image-alt"][data-collage-index="${collageIndex}"]`);
      if (pathInput) pathInput.value = imagePath;
      if (altInput) altInput.value = collageItem.alt;
      if (preview) preview.innerHTML = createPreviewMarkup(URL.createObjectURL(file), collageItem.alt);
      setStatus(`Selected a new image for ${profile.label.de || profile.id}. Save changes to publish it.`, "success");
    });
  });
}

function renderAdmin() {
  normalizeProjectOrders();
  renderProjectList();
  fillProjectForm(getSelectedProject());
  fillHeroSection();
  fillDocumentSection();
  renderLifestyleAdmin();
}

function syncLoadedData(projectsData, siteContentData) {
  state.projects = deepClone(Array.isArray(projectsData.projects) ? projectsData.projects : []);
  state.siteContent = normalizeSiteContent(siteContentData);
  state.selectedProjectId = state.projects[0]?.id || null;
}

async function loadPublishedData() {
  const [projectsResponse, siteResponse] = await Promise.all([
    fetch(resolveSiteUrl("data/projects.json"), { cache: "no-store" }),
    fetch(resolveSiteUrl("data/site-content.json"), { cache: "no-store" }),
  ]);

  if (!projectsResponse.ok || !siteResponse.ok) {
    throw new Error("Could not load site data.");
  }

  const [projectsData, siteContentData] = await Promise.all([
    projectsResponse.json(),
    siteResponse.json(),
  ]);

  syncLoadedData(projectsData, siteContentData);
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

function buildProjectsPayload() {
  normalizeProjectOrders();
  return {
    projects: [...state.projects].sort((a, b) => a.order - b.order),
  };
}

function buildSiteContentPayload() {
  return normalizeSiteContent(state.siteContent);
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

    syncLoadedData(projectsData, siteContentData);
    renderAdmin();
    setStatus("Local project folder connected. You can now write files directly into this workspace from the browser.", "success");
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
      syncLoadedData(projectsData, siteContentData);
      renderAdmin();
      setStatus("Reloaded data from the connected local folder.", "success");
      return;
    }

    await loadPublishedData();
    renderAdmin();
    setStatus("Reloaded data from the live website JSON files.", "success");
  } catch (error) {
    console.error(error);
    setStatus("Could not reload data.", "error");
  }
}

async function saveToLocalFolder() {
  if (!state.directoryHandle) {
    throw new Error("Connect your local project folder first.");
  }

  if (state.pendingHeroImage) {
    const extension = getFileExtension(state.pendingHeroImage.name);
    const heroPath = `assets/images/hero-portrait${extension}`;
    await writeBinaryFile(heroPath, state.pendingHeroImage);
    state.siteContent.heroPortrait.src = heroPath;
    state.pendingHeroImage = null;
  }

  if (state.pendingDocumentFiles.cv) {
    await writeBinaryFile(state.siteContent.documents.cv.src, state.pendingDocumentFiles.cv);
    state.pendingDocumentFiles.cv = null;
  }

  if (state.pendingDocumentFiles.application) {
    await writeBinaryFile(state.siteContent.documents.application.src, state.pendingDocumentFiles.application);
    state.pendingDocumentFiles.application = null;
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
    ensureCollageItem(profile, index).image = filePath;
  }
  state.pendingLifestyleImages.clear();

  await writeTextFile("data/projects.json", `${JSON.stringify(buildProjectsPayload(), null, 2)}\n`);
  await writeTextFile("data/site-content.json", `${JSON.stringify(buildSiteContentPayload(), null, 2)}\n`);
}

async function githubRequest(path, options = {}) {
  persistGitHubToken();

  if (!state.github.token) {
    throw new Error("Add a GitHub token before publishing to the live website.");
  }

  const response = await fetch(`https://api.github.com${path}`, {
    method: options.method || "GET",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${state.github.token}`,
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...options.headers,
    },
    body: options.body,
  });

  if (!response.ok) {
    let message = `GitHub request failed (${response.status}).`;
    try {
      const payload = await response.json();
      if (payload.message) {
        message = `GitHub request failed: ${payload.message}`;
      }
    } catch {
      // Ignore JSON parsing issues and keep the generic message.
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

async function createGitHubBlobFromText(content) {
  const result = await githubRequest(`/repos/${REPO_CONFIG.owner}/${REPO_CONFIG.repo}/git/blobs`, {
    method: "POST",
    body: JSON.stringify({
      content: textToBase64(content),
      encoding: "base64",
    }),
  });

  return result.sha;
}

async function createGitHubBlobFromFile(file) {
  const result = await githubRequest(`/repos/${REPO_CONFIG.owner}/${REPO_CONFIG.repo}/git/blobs`, {
    method: "POST",
    body: JSON.stringify({
      content: await fileToBase64(file),
      encoding: "base64",
    }),
  });

  return result.sha;
}

function isFastForwardConflict(error) {
  return /not a fast forward/i.test(error?.message || "");
}

function clearPendingUploads() {
  state.pendingProjectImages.clear();
  state.pendingLifestyleImages.clear();
  state.pendingHeroImage = null;
  state.pendingDocumentFiles.cv = null;
  state.pendingDocumentFiles.application = null;
}

async function buildGitHubTreeEntries() {
  const treeEntries = [];

  if (state.pendingHeroImage) {
    const extension = getFileExtension(state.pendingHeroImage.name);
    const heroPath = `assets/images/hero-portrait${extension}`;
    treeEntries.push({
      path: heroPath,
      mode: "100644",
      type: "blob",
      sha: await createGitHubBlobFromFile(state.pendingHeroImage),
    });
    state.siteContent.heroPortrait.src = heroPath;
  }

  if (state.pendingDocumentFiles.cv) {
    treeEntries.push({
      path: state.siteContent.documents.cv.src,
      mode: "100644",
      type: "blob",
      sha: await createGitHubBlobFromFile(state.pendingDocumentFiles.cv),
    });
  }

  if (state.pendingDocumentFiles.application) {
    treeEntries.push({
      path: state.siteContent.documents.application.src,
      mode: "100644",
      type: "blob",
      sha: await createGitHubBlobFromFile(state.pendingDocumentFiles.application),
    });
  }

  for (const [projectId, file] of state.pendingProjectImages.entries()) {
    const project = state.projects.find((item) => item.id === projectId);
    if (!project) {
      continue;
    }

    const extension = getFileExtension(file.name);
    const filePath = `assets/projects/${slugify(project.id)}${extension}`;
    treeEntries.push({
      path: filePath,
      mode: "100644",
      type: "blob",
      sha: await createGitHubBlobFromFile(file),
    });
    project.image = filePath;
  }

  for (const [key, file] of state.pendingLifestyleImages.entries()) {
    const [profileId, collageIndex] = key.split(":");
    const profile = state.siteContent.lifestyleProfiles.find((item) => item.id === profileId);
    const index = Number(collageIndex);
    if (!profile || !Number.isInteger(index)) {
      continue;
    }

    const extension = getFileExtension(file.name);
    const filePath = `assets/images/lifestyle-${slugify(profile.id)}-${index + 1}${extension}`;
    treeEntries.push({
      path: filePath,
      mode: "100644",
      type: "blob",
      sha: await createGitHubBlobFromFile(file),
    });
    ensureCollageItem(profile, index).image = filePath;
  }

  treeEntries.push({
    path: "data/projects.json",
    mode: "100644",
    type: "blob",
    sha: await createGitHubBlobFromText(`${JSON.stringify(buildProjectsPayload(), null, 2)}\n`),
  });
  treeEntries.push({
    path: "data/site-content.json",
    mode: "100644",
    type: "blob",
    sha: await createGitHubBlobFromText(`${JSON.stringify(buildSiteContentPayload(), null, 2)}\n`),
  });

  return treeEntries;
}

async function publishToGitHub() {
  const treeEntries = await buildGitHubTreeEntries();

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const refData = await githubRequest(`/repos/${REPO_CONFIG.owner}/${REPO_CONFIG.repo}/git/ref/heads/${REPO_CONFIG.branch}`);
    const parentCommitSha = refData.object.sha;
    const commitData = await githubRequest(`/repos/${REPO_CONFIG.owner}/${REPO_CONFIG.repo}/git/commits/${parentCommitSha}`);

    const treeData = await githubRequest(`/repos/${REPO_CONFIG.owner}/${REPO_CONFIG.repo}/git/trees`, {
      method: "POST",
      body: JSON.stringify({
        base_tree: commitData.tree.sha,
        tree: treeEntries,
      }),
    });

    const commitMessage = `Update portfolio content via /admin (${new Date().toISOString()})`;
    const newCommit = await githubRequest(`/repos/${REPO_CONFIG.owner}/${REPO_CONFIG.repo}/git/commits`, {
      method: "POST",
      body: JSON.stringify({
        message: commitMessage,
        tree: treeData.sha,
        parents: [parentCommitSha],
      }),
    });

    try {
      await githubRequest(`/repos/${REPO_CONFIG.owner}/${REPO_CONFIG.repo}/git/refs/heads/${REPO_CONFIG.branch}`, {
        method: "PATCH",
        body: JSON.stringify({
          sha: newCommit.sha,
          force: false,
        }),
      });

      clearPendingUploads();
      return;
    } catch (error) {
      if (isFastForwardConflict(error) && attempt < 2) {
        continue;
      }

      throw error;
    }
  }
}

async function saveAllChanges() {
  if (state.isSaving) {
    return;
  }

  syncSelectedProjectFromForm();
  syncHeroSection();
  syncDocumentSection();
  persistGitHubToken();
  setSavingState(true);

  try {
    if (state.github.token) {
      await publishToGitHub();
      renderAdmin();
      setStatus("Saved to GitHub successfully. GitHub Pages will publish the updated site automatically after the new commit is processed.", "success");
      return;
    }

    if (state.directoryHandle) {
      await saveToLocalFolder();
      renderAdmin();
      setStatus("Saved into the connected local project folder successfully.", "success");
      return;
    }

    setStatus("Add a GitHub token for live publishing or connect the local project folder for local file saving.", "error");
  } catch (error) {
    console.error(error);
    setStatus(error.message || "Saving failed.", "error");
  } finally {
    setSavingState(false);
  }
}

function downloadBackupJson() {
  syncSelectedProjectFromForm();
  syncHeroSection();

  const backupPayload = {
    generatedAt: new Date().toISOString(),
    projects: buildProjectsPayload().projects,
    siteContent: buildSiteContentPayload(),
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

githubTokenInput.addEventListener("input", persistGitHubToken);
rememberGitHubTokenInput.addEventListener("change", persistGitHubToken);
manageGitHubConnectionButton?.addEventListener("click", openGitHubSettings);
disconnectGitHubButton?.addEventListener("click", disconnectGitHubToken);
closeGitHubSettingsButton?.addEventListener("click", closeGitHubSettings);

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
  setStatus("Cover image selected. Save changes to publish it to the site.", "success");
});

heroFields.path.addEventListener("input", syncHeroSection);
heroFields.altDe.addEventListener("input", syncHeroSection);
heroFields.altEn.addEventListener("input", syncHeroSection);
cvFilePathInput.addEventListener("input", syncDocumentSection);
applicationFilePathInput.addEventListener("input", syncDocumentSection);

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
  setStatus("Hero image selected. Save changes to publish it to the site.", "success");
});

cvFileUploadButton.addEventListener("click", () => cvFileInput.click());
cvFileInput.addEventListener("change", () => {
  const file = cvFileInput.files?.[0];
  if (!file) {
    return;
  }

  const extension = getFileExtension(file.name);
  const filePath = `assets/projects/Lebenslauf-Khalil-Nabu${extension}`;
  state.siteContent.documents.cv.src = filePath;
  state.siteContent.documents.cv.updatedAt = new Date().toISOString();
  cvFilePathInput.value = filePath;
  state.pendingDocumentFiles.cv = file;
  fillDocumentSection();
  setStatus("Lebenslauf file selected. Save changes to publish it to the site.", "success");
});

applicationFileUploadButton.addEventListener("click", () => applicationFileInput.click());
applicationFileInput.addEventListener("change", () => {
  const file = applicationFileInput.files?.[0];
  if (!file) {
    return;
  }

  const extension = getFileExtension(file.name);
  const filePath = `assets/projects/Bewerbung-Khalil-Nabu${extension}`;
  state.siteContent.documents.application.src = filePath;
  state.siteContent.documents.application.updatedAt = new Date().toISOString();
  applicationFilePathInput.value = filePath;
  state.pendingDocumentFiles.application = file;
  fillDocumentSection();
  setStatus("Bewerbung file selected. Save changes to publish it to the site.", "success");
});

async function initializeAdmin() {
  githubRepoLabel.textContent = `${REPO_CONFIG.owner}/${REPO_CONFIG.repo}`;
  githubBranchLabel.textContent = REPO_CONFIG.branch;
  loadStoredGitHubToken();
  updateConnectionUi();

  try {
    await loadPublishedData();
    renderAdmin();
    if (state.github.token) {
      setStatus("Live website data loaded. Your GitHub token is ready, so Save Changes will publish directly to the site.", "success");
      return;
    }

    setStatus("Live website data loaded. Add a GitHub token for direct publishing, or connect the local project folder if you want local file writes instead.", "success");
  } catch (error) {
    console.error(error);
    setStatus("Could not load the current JSON files. Make sure data/projects.json and data/site-content.json exist.", "error");
  }
}

initializeAdmin();
