// Hint tooltip library for skill calculator
var Hint = {
  tooltip: null,

  show: function (text, event) {
    // Create tooltip if it doesn't exist
    if (!this.tooltip) {
      this.tooltip = document.createElement("div")
      this.tooltip.id = "hint-tooltip"
      this.tooltip.style.cssText =
        "position: absolute; " +
        "background: #fffef0; " +
        "color: #000; " +
        "border: 2px solid #8b7355; " +
        "padding: 12px 15px; " +
        "border-radius: 6px; " +
        "box-shadow: 0 4px 12px rgba(0,0,0,0.4); " +
        "z-index: 10000; " +
        "max-width: 450px; " +
        "min-width: 200px; " +
        "font-size: 13px; " +
        "line-height: 1.6; " +
        "font-family: Arial, sans-serif; " +
        "word-wrap: break-word; " +
        "white-space: normal; " +
        "pointer-events: none;"
      document.body.appendChild(this.tooltip)
    }

    // Set content
    this.tooltip.innerHTML = text
    this.tooltip.style.display = "block"

    // Position tooltip near mouse
    var x = event.pageX || event.clientX + document.documentElement.scrollLeft
    var y = event.pageY || event.clientY + document.documentElement.scrollTop

    // Offset from cursor
    x += 15
    y += 15

    // Keep tooltip on screen
    var tooltipRect = this.tooltip.getBoundingClientRect()
    var viewportWidth = window.innerWidth || document.documentElement.clientWidth
    var viewportHeight = window.innerHeight || document.documentElement.clientHeight

    if (x + tooltipRect.width > viewportWidth) {
      x = viewportWidth - tooltipRect.width - 10
    }

    if (y + tooltipRect.height > viewportHeight + window.pageYOffset) {
      y = y - tooltipRect.height - 30
    }

    this.tooltip.style.left = x + "px"
    this.tooltip.style.top = y + "px"
  },

  hide: function () {
    if (this.tooltip) {
      this.tooltip.style.display = "none"
    }
  },
}
