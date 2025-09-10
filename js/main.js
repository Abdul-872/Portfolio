// Main JavaScript functionality
class PortfolioApp {
  constructor() {
    this.init()
  }

  init() {
    this.setupTheme()
    this.setupNavigation()
    this.setupProjects()
    this.setupContactForm()
    this.setupModal()
    this.setupScrollAnimations()
    this.setupSkillBars()
    this.setupTypewriter()
  }

  setupTheme() {
    const themeToggle = document.getElementById("themeToggle")
    const savedTheme = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    // Set initial theme
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light")
    this.setTheme(initialTheme)

    // Theme toggle event
    themeToggle?.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme")
      const newTheme = currentTheme === "dark" ? "light" : "dark"
      this.setTheme(newTheme)
      localStorage.setItem("theme", newTheme)
    })

    // Listen for system theme changes
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        this.setTheme(e.matches ? "dark" : "light")
      }
    })
  }

  setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme)
    document.body.setAttribute("data-theme", theme)

    // Apply theme to all major sections and elements
    const sections = document.querySelectorAll(
      "section, .header, .footer, .modal-content, .contact-form, .project-card, .achievement-card, .connect-link",
    )
    sections.forEach((section) => {
      section.setAttribute("data-theme", theme)
    })
  }

  // Navigation
  setupNavigation() {
    const navToggle = document.getElementById("navToggle")
    const navLinks = document.getElementById("navLinks")
    const navLinkElements = document.querySelectorAll(".nav-link")

    // Mobile menu toggle
    navToggle?.addEventListener("click", () => {
      navLinks?.classList.toggle("active")
      const isExpanded = navLinks?.classList.contains("active")
      navToggle.setAttribute("aria-expanded", isExpanded)
    })

    // Smooth scroll for navigation links
    navLinkElements.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const targetId = link.getAttribute("href")
        const targetSection = document.querySelector(targetId)

        if (targetSection) {
          const headerHeight = document.querySelector(".header").offsetHeight
          const targetPosition = targetSection.offsetTop - headerHeight

          // Close mobile menu if open
          navLinks?.classList.remove("active")
          navToggle?.setAttribute("aria-expanded", "false")

          // Smooth scroll with reduced motion support
          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            window.scrollTo(0, targetPosition)
          } else {
            window.scrollTo({
              top: targetPosition,
              behavior: "smooth",
            })
          }
        }
      })
    })

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".nav") && navLinks?.classList.contains("active")) {
        navLinks.classList.remove("active")
        navToggle?.setAttribute("aria-expanded", "false")
      }
    })

    // Keyboard navigation for mobile menu
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navLinks?.classList.contains("active")) {
        navLinks.classList.remove("active")
        navToggle?.setAttribute("aria-expanded", "false")
        navToggle?.focus()
      }
    })
  }

  // Projects
  setupProjects() {
    this.loadProjects()
    this.setupProjectFilters()
  }

  loadProjects() {
    const projectsGrid = document.getElementById("projectsGrid")
    if (!projectsGrid || !window.projectsData) return

    projectsGrid.innerHTML = ""

    window.projectsData.forEach((project) => {
      const projectCard = this.createProjectCard(project)
      projectsGrid.appendChild(projectCard)
    })
  }

  createProjectCard(project) {
    const card = document.createElement("div")
    card.className = "project-card"
    card.setAttribute("data-tags", project.tags.join(" "))

    const imageMap = {
      "ai-code-reviewer": "./assets/ai-review.jpg",
      "ats-score-checker": "./assets/ats-resume-checker.jpg",
      "todo-fetch-api": "./assets/fetch-api-javascript.jpg",
      "personal-portfolio": "./assets/portfolio-image.jpg",
      "chat-application": "./assets/chat-application.jpg",
    }

    const imageSrc = imageMap[project.id] || "/project-placeholder.png"
    const imageAlt = `${project.title} - ${project.short}`

    const liveButton = project.live
      ? `<a href="${project.live}" target="_blank" rel="noopener noreferrer" class="project-link">Live Demo</a>`
      : ""

    card.innerHTML = `
            <img src="${imageSrc}" alt="${imageAlt}" class="project-img">
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.short}</p>
                <div class="project-tags">
                    ${project.tech.map((tech) => `<span class="project-tag">${tech}</span>`).join("")}
                </div>
                <div class="project-links">
                    ${liveButton}
                    <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link">GitHub</a>
                </div>
            </div>
        `

    // Add click event to open modal
    card.addEventListener("click", (e) => {
      // Don't open modal if clicking on links
      if (e.target.closest(".project-link")) return
      this.openProjectModal(project)
    })

    // Add keyboard support
    card.setAttribute("tabindex", "0")
    card.setAttribute("role", "button")
    card.setAttribute("aria-label", `View details for ${project.title}`)

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        this.openProjectModal(project)
      }
    })

    return card
  }

  setupProjectFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn")
    const projectCards = document.querySelectorAll(".project-card")

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter")

        // Update active button
        filterButtons.forEach((btn) => {
          btn.classList.remove("active")
          btn.setAttribute("aria-pressed", "false")
        })
        button.classList.add("active")
        button.setAttribute("aria-pressed", "true")

        projectCards.forEach((card) => {
          const cardTags = card.getAttribute("data-tags")
          let shouldShow = false

          if (filter === "all") {
            shouldShow = true
          } else if (filter === "frontend") {
            // Show cards that have frontend tag but not fullstack
            shouldShow = cardTags.includes("frontend") && !cardTags.includes("fullstack")
          } else if (filter === "fullstack") {
            shouldShow = cardTags.includes("fullstack")
          } else if (filter === "backend") {
            shouldShow = cardTags.includes("backend") && !cardTags.includes("fullstack")
          } else {
            shouldShow = cardTags.includes(filter)
          }

          if (shouldShow) {
            card.style.display = "block"
            card.setAttribute("aria-hidden", "false")
          } else {
            card.style.display = "none"
            card.setAttribute("aria-hidden", "true")
          }
        })
      })
    })
  }

  // Modal
  setupModal() {
    const modal = document.getElementById("projectModal")
    const modalClose = document.getElementById("modalClose")
    const modalOverlay = document.getElementById("modalOverlay")

    // Close modal events
    ;[modalClose, modalOverlay].forEach((element) => {
      element?.addEventListener("click", () => {
        this.closeModal()
      })
    })

    // Keyboard events for modal
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal?.classList.contains("active")) {
        this.closeModal()
      }
    })

    // Focus trap for modal
    modal?.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        this.trapFocus(e, modal)
      }
    })
  }

  openProjectModal(project) {
    const modal = document.getElementById("projectModal")
    const modalBody = document.getElementById("modalBody")

    if (!modal || !modalBody) return

    const liveButton = project.live
      ? `<a href="${project.live}" target="_blank" rel="noopener noreferrer" class="project-link">Live Demo</a>`
      : ""

    modalBody.innerHTML = `
            <h3 id="modalTitle">${project.title}</h3>
            <div id="modalDescription">
                <p>${project.description}</p>
                
                ${
                  project.features
                    ? `
                    <h4>Key Features:</h4>
                    <ul>
                        ${project.features.map((feature) => `<li>${feature}</li>`).join("")}
                    </ul>
                `
                    : ""
                }
                
                ${
                  project.challenges
                    ? `
                    <h4>Challenges & Solutions:</h4>
                    <p>${project.challenges}</p>
                `
                    : ""
                }
                
                <div class="project-tags">
                    ${project.tech.map((tech) => `<span class="project-tag">${tech}</span>`).join("")}
                </div>
                
                <div class="project-links">
                    ${liveButton}
                    <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link">GitHub</a>
                </div>
            </div>
        `

    modal.classList.add("active")
    modal.setAttribute("aria-hidden", "false")

    // Focus management
    this.previousFocus = document.activeElement
    const firstFocusable = modal.querySelector("button, a, [tabindex]")
    firstFocusable?.focus()
  }

  closeModal() {
    const modal = document.getElementById("projectModal")
    if (!modal) return

    modal.classList.remove("active")
    modal.setAttribute("aria-hidden", "true")

    // Restore focus
    if (this.previousFocus) {
      this.previousFocus.focus()
      this.previousFocus = null
    }
  }

  trapFocus(e, container) {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault()
      lastElement.focus()
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault()
      firstElement.focus()
    }
  }

  // Contact Form
  setupContactForm() {
    const form = document.getElementById("contactForm")
    if (!form) return

    form.addEventListener("submit", (e) => {
      e.preventDefault()
      this.handleFormSubmission(form)
    })

    // Real-time validation
    const inputs = form.querySelectorAll("input, textarea")
    inputs.forEach((input) => {
      input.addEventListener("blur", () => {
        this.validateField(input)
      })

      input.addEventListener("input", () => {
        this.clearFieldError(input)
      })
    })
  }

  validateField(field) {
    const value = field.value.trim()
    const fieldName = field.name
    let isValid = true
    let errorMessage = ""

    switch (fieldName) {
      case "name":
        if (!value) {
          isValid = false
          errorMessage = "Name is required"
        } else if (value.length < 2) {
          isValid = false
          errorMessage = "Name must be at least 2 characters"
        }
        break

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!value) {
          isValid = false
          errorMessage = "Email is required"
        } else if (!emailRegex.test(value)) {
          isValid = false
          errorMessage = "Please enter a valid email address"
        }
        break

      case "subject":
        if (!value) {
          isValid = false
          errorMessage = "Subject is required"
        }
        break

      case "message":
        if (!value) {
          isValid = false
          errorMessage = "Message is required"
        } else if (value.length < 10) {
          isValid = false
          errorMessage = "Message must be at least 10 characters"
        }
        break
    }

    this.showFieldError(field, isValid ? "" : errorMessage)
    return isValid
  }

  showFieldError(field, message) {
    const errorElement = document.getElementById(`${field.name}Error`)
    if (errorElement) {
      errorElement.textContent = message
    }

    field.classList.toggle("error", !!message)
    field.setAttribute("aria-invalid", !!message)
  }

  clearFieldError(field) {
    this.showFieldError(field, "")
  }

  handleFormSubmission(form) {
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)

    // Validate all fields
    let isFormValid = true
    const fields = form.querySelectorAll("input, textarea")
    fields.forEach((field) => {
      if (!this.validateField(field)) {
        isFormValid = false
      }
    })

    if (!isFormValid) {
      this.showToast("Please fix the errors above", "error")
      return
    }

    const subject = encodeURIComponent(`Portfolio Contact: ${data.subject}`)
    const body = encodeURIComponent(`
Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}
    `)

    const mailtoLink = `mailto:abdulahadkhan8720@gmail.com?subject=${subject}&body=${body}`
    window.location.href = mailtoLink

    this.showToast("Email client opened! Thank you for your message.", "success")
    form.reset()
  }

  showToast(message, type = "info") {
    const toast = document.getElementById("toast")
    const toastContent = document.getElementById("toastContent")

    if (!toast || !toastContent) return

    toastContent.textContent = message
    toast.className = `toast ${type}`
    toast.classList.add("show")

    setTimeout(() => {
      toast.classList.remove("show")
    }, 5000)
  }

  // Scroll Animations
  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    }, observerOptions)

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll(
      ".animate-fade-in, .animate-slide-up, .animate-slide-right, .animate-slide-up-light, .animate-stagger > *, .animate-stagger-light > *",
    )

    animatedElements.forEach((el) => {
      el.style.opacity = "0"
      el.style.transform = "translateY(30px)"
      observer.observe(el)
    })
  }

  // Skill Bars Animation
  setupSkillBars() {
    const skillBars = document.querySelectorAll(".skill-progress")
    const observerOptions = {
      threshold: 0.5,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBar = entry.target
          const width = progressBar.getAttribute("data-width")
          progressBar.style.width = width
        }
      })
    }, observerOptions)

    skillBars.forEach((bar) => {
      observer.observe(bar)
    })
  }

  // Typewriter Effect
  setupTypewriter() {
    const typewriterElement = document.querySelector(".typewriter-text")
    if (!typewriterElement) return

    const text = typewriterElement.getAttribute("data-text")
    if (!text) return

    typewriterElement.textContent = ""
    let i = 0

    const typeWriter = () => {
      if (i < text.length) {
        typewriterElement.textContent += text.charAt(i)
        i++
        setTimeout(typeWriter, 100)
      }
    }

    // Start typewriter effect after a short delay
    setTimeout(typeWriter, 500)
  }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new PortfolioApp()
})
