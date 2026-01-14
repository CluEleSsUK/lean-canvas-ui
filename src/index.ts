import html2canvas from "html2canvas"

function encodeCanvasData(textareas: NodeListOf<HTMLTextAreaElement>): string {
    const data = Array.from(textareas).map((textarea) => textarea.value)
    const json = JSON.stringify(data)
    return btoa(encodeURIComponent(json))
}

function decodeCanvasData(encoded: string): string[] | null {
    try {
        const json = decodeURIComponent(atob(encoded))
        const data = JSON.parse(json)
        if (Array.isArray(data) && data.every((item) => typeof item === "string")) {
            return data
        }
        return null
    } catch {
        return null
    }
}

function loadFromUrl(textareas: NodeListOf<HTMLTextAreaElement>): void {
    const hash = window.location.hash
    if (!hash.startsWith("#data=")) {
        return
    }

    const encoded = hash.slice(6)
    const data = decodeCanvasData(encoded)
    if (!data) {
        console.error("Failed to decode canvas data from URL")
        return
    }

    textareas.forEach((textarea, index) => {
        if (index < data.length) {
            textarea.value = data[index]
        }
    })
}

document.addEventListener("DOMContentLoaded", () => {
    const downloadBtn = document.getElementById("download-btn") as HTMLButtonElement | null
    const shareBtn = document.getElementById("share-btn") as HTMLButtonElement | null
    const leanCanvas = document.getElementById("lean-canvas")

    if (!downloadBtn || !shareBtn || !leanCanvas) {
        console.error("Required elements not found")
        return
    }

    const textareas = leanCanvas.querySelectorAll("textarea")

    // Load data from URL on page load
    loadFromUrl(textareas)

    // Share button handler
    shareBtn.addEventListener("click", async () => {
        const encoded = encodeCanvasData(textareas)
        const url = `${window.location.origin}${window.location.pathname}#data=${encoded}`

        try {
            await navigator.clipboard.writeText(url)
            const originalText = shareBtn.textContent
            shareBtn.textContent = "Copied!"
            setTimeout(() => {
                shareBtn.textContent = originalText
            }, 2000)
        } catch {
            // Fallback: update URL and prompt user
            window.location.hash = `data=${encoded}`
            alert("URL updated. Copy it from your browser address bar to share.")
        }
    })

    downloadBtn.addEventListener("click", async () => {
        try {
            downloadBtn.disabled = true
            downloadBtn.textContent = "Generating..."

            // Get all textareas and temporarily replace them with divs for better rendering
            const textareas = leanCanvas.querySelectorAll("textarea")
            const replacements: HTMLDivElement[] = []

            textareas.forEach((textarea) => {
                // Create a div with the same content
                const div = document.createElement("div")
                div.className = "textarea-replacement"
                div.style.cssText = window.getComputedStyle(textarea).cssText
                div.style.overflow = "hidden"
                div.style.whiteSpace = "pre-wrap"
                div.style.overflowWrap = "break-word"
                div.textContent = textarea.value || textarea.placeholder

                if (!textarea.value) {
                    div.style.color = "#999"
                    div.style.fontStyle = "italic"
                }

                textarea.style.display = "none"
                textarea.parentNode?.insertBefore(div, textarea.nextSibling)
                replacements.push(div)
            })

            // Generate canvas
            const canvas = await html2canvas(leanCanvas, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff",
                logging: false,
            })

            // Restore textareas
            textareas.forEach((textarea) => {
                textarea.style.display = ""
            })

            // Remove replacement divs
            replacements.forEach((div) => div.remove())

            // Download the image
            const link = document.createElement("a")
            link.download = "lean-canvas.png"
            link.href = canvas.toDataURL("image/png")
            link.click()

            downloadBtn.disabled = false
            downloadBtn.textContent = "Download as Image"
        } catch (error) {
            console.error("Error generating image:", error)
            downloadBtn.disabled = false
            downloadBtn.textContent = "Download as Image"
            alert("Error generating image. Please try again.")
        }
    })
})
