import html2canvas from "html2canvas"

document.addEventListener("DOMContentLoaded", () => {
    const downloadBtn = document.getElementById("download-btn") as HTMLButtonElement | null
    const leanCanvas = document.getElementById("lean-canvas")

    if (!downloadBtn || !leanCanvas) {
        console.error("Required elements not found")
        return
    }

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
