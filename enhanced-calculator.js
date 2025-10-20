// Enhanced Jadeon Calculator
class EnhancedJadeonCalculator {
  constructor() {
    this.state = {
      skillPoints: 0,
      bookPoints: 0,
      playerLevel: 1,
      allocatedSkills: {},
    }
    this.init()
  }

  init() {
    console.log("=== INITIALIZING ENHANCED JADEON CALCULATOR ===")

    // Ensure DOM elements exist
    const cmenu = document.getElementById("cmenu")
    const skill = document.getElementById("skill")

    if (!cmenu || !skill) {
      console.error("❌ Calculator DOM elements missing! Creating them...")
      this.createCalculatorElements()
      return
    }

    try {
      // Try the original calculator first
      console.log("🚀 Attempting original calculator...")
      window.C.init("jadeon")
      console.log("✅ Original calculator worked!")
    } catch (error) {
      console.log("❌ Original calculator failed, using enhanced custom calculator")
      this.createEnhancedCalculator()
    }
  }

  createCalculatorElements() {
    console.log("🛠️ Creating missing calculator elements...")

    const content = document.getElementById("content")
    if (!content) {
      console.error("❌ Content element also missing!")
      return
    }

    // Create the missing table structure
    content.innerHTML = `
            <div class="tableHeader tup">Skill Calculator: Jadeon</div>
            <table class="calc" style="width: 100%; border-collapse: collapse;">
                <tbody>
                    <tr>
                        <td id="cmenu" style="width: 240px; vertical-align: top; padding: 1rem;"></td>
                        <td id="skill" style="width: auto; vertical-align: top; padding: 1rem;"></td>
                    </tr>
                </tbody>
            </table>
        `

    // Retry initialization after creating elements
    setTimeout(() => this.createEnhancedCalculator(), 100)
  }

  createEnhancedCalculator() {
    console.log("🎯 Creating Enhanced Jadeon Calculator")

    // Verify we have skill data
    const si = window.si // Declare the variable before using it
    if (!si || !si["jadeon"]) {
      console.error("❌ No Jadeon skill data found!")
      this.showNoDataError()
      return
    }

    console.log("📊 Skill data available:", Object.keys(si["jadeon"]).length, "skills")

    // Get DOM elements
    const cmenu = document.getElementById("cmenu")
    const skill = document.getElementById("skill")

    if (!cmenu || !skill) {
      console.error("❌ Calculator elements still missing after creation!")
      return
    }

    // Clear any existing content
    cmenu.innerHTML = ""
    skill.innerHTML = ""

    // Get the actual skill data
    const skillData = si["jadeon"] || {}
    const skillCount = Object.keys(skillData).length

    console.log("Creating calculator with", skillCount, "skills")

    // Create enhanced calculator UI
    cmenu.innerHTML = this.createControlPanel()
    skill.innerHTML = this.createSkillInterface(skillData, "jadeon")

    // Initialize calculator state
    this.initializeCalculatorState()

    console.log(`✅ Enhanced calculator loaded with ${skillCount} skills`)
  }

  createControlPanel() {
    return `
            <div class="control-panel">
                <h3 style="color: #06b6d4; margin-bottom: 1rem; text-align: center;">Jadeon Calculator</h3>
                
                <div class="points-display">
                    <div class="point-row">
                        <span>Skill Points:</span>
                        <span id="skillPoints" style="color: #06b6d4; font-weight: bold;">0/150</span>
                    </div>
                    <div class="point-row">
                        <span>Book Points:</span>
                        <span id="bookPoints" style="color: #06b6d4; font-weight: bold;">0/48</span>
                    </div>
                    <div class="point-row">
                        <span>Player Level:</span>
                        <span id="playerLevel" style="color: #06b6d4; font-weight: bold;">1</span>
                    </div>
                </div>
                
                <div class="control-buttons">
                    <button class="control-button" onclick="enhancedCalculator.resetCalculator()">Reset All</button>
                    <button class="control-button export" onclick="enhancedCalculator.exportBuild()">Export Build</button>
                </div>
                
                <div class="tier-progress">
                    <h4 style="color: #06b6d4; margin-bottom: 0.5rem;">Tier Progress</h4>
                    <div id="tierProgress">
                        <div style="color: #94a3b8; text-align: center;">Allocate skills to see progress</div>
                    </div>
                </div>
            </div>
        `
  }

  createSkillInterface(skillData, className) {
    const skillsByTier = this.organizeSkillsByTier(skillData)
    const tierCount = Object.keys(skillsByTier).length

    console.log("Organized skills into", tierCount, "tiers:", Object.keys(skillsByTier))

    if (tierCount === 0) {
      return this.createNoSkillsFound()
    }

    return `
            <div class="enhanced-calculator">
                <div style="text-align: center; margin-bottom: 2rem;">
                    <h2 style="color: #06b6d4;">Jadeon Skill Planner</h2>
                    <p style="color: #cbd5e1;">Plan your Jadeon skill build. Click skills to allocate points.</p>
                    <p style="color: #94a3b8; font-size: 0.9rem;">Found ${Object.keys(skillData).length} skills in ${tierCount} tiers</p>
                </div>
                
                ${Object.keys(skillsByTier)
                  .map((tier) => this.createTierSection(tier, skillsByTier[tier]))
                  .join("")}
                
                <div class="build-summary">
                    <h4 style="color: #06b6d4; margin-bottom: 1rem;">Build Summary</h4>
                    <div id="buildSummary" style="color: #cbd5e1;">
                        No skills allocated yet. Click on skills above to start building.
                    </div>
                </div>
            </div>
        `
  }

  createTierSection(tier, skills) {
    return `
            <div class="tier-section">
                <h3 class="tier-header">
                    ${this.getTierName(tier)} 
                    <span style="color: #cbd5e1; font-size: 0.8em;">(<span id="tier${tier}Count">0</span> points)</span>
                </h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1rem;">
                    ${skills.map((skill) => this.createSkillCard(skill)).join("")}
                </div>
            </div>
        `
  }

  createSkillCard(skill) {
    return `
            <div class="skill-card" 
                 onclick="enhancedCalculator.allocateSkillPoint(${skill.id})"
                 onmouseover="enhancedCalculator.showSkillTooltip(${skill.id})"
                 onmouseout="enhancedCalculator.hideSkillTooltip()">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                    <h4 style="color: white; margin: 0; flex: 1;">Skill ${skill.id}</h4>
                    <span id="skill${skill.id}Level" class="skill-level">0/${skill.ml || 1}</span>
                </div>
                <div style="color: #cbd5e1; font-size: 0.9rem;">
                    ${this.getSkillDescription(skill)}
                </div>
                <div class="skill-points">
                    ${Array.from(
                      { length: skill.ml || 1 },
                      (_, i) => `<div id="skill${skill.id}Point${i}" class="skill-point"></div>`,
                    ).join("")}
                </div>
            </div>
        `
  }

  // ... (rest of the methods from the previous version)
  // organizeSkillsByTier, getTierName, getSkillDescription, etc.

  allocateSkillPoint(skillId) {
    const skillData = window.si["jadeon"] // Access skill data from window object
    const skill = skillData[skillId]
    if (!skill) return

    const currentLevel = this.state.allocatedSkills[skillId] || 0
    const maxLevel = skill.ml || 1

    if (currentLevel < maxLevel) {
      // Check point limits
      const tier = skill.t || 1
      const isTomeSkill = tier >= 7
      const pointType = isTomeSkill ? "bookPoints" : "skillPoints"
      const maxPoints = isTomeSkill ? 48 : 150

      if (this.state[pointType] < maxPoints) {
        this.state.allocatedSkills[skillId] = currentLevel + 1
        this.state[pointType]++
        this.updateSkillDisplay(skillId)
        this.updatePointsDisplay()
        this.updateTierProgress()
        this.updateBuildSummary()
      } else {
        alert(`Not enough ${isTomeSkill ? "book" : "skill"} points!`)
      }
    }
  }

  resetCalculator() {
    if (confirm("Reset all skill allocations?")) {
      this.state.allocatedSkills = {}
      this.state.skillPoints = 0
      this.state.bookPoints = 0

      // Reset all skill displays
      const skillData = window.si["jadeon"] // Access skill data from window object
      Object.keys(skillData).forEach((skillId) => {
        this.updateSkillDisplay(Number.parseInt(skillId))
      })

      this.updatePointsDisplay()
      this.updateTierProgress()
      this.updateBuildSummary()
    }
  }

  exportBuild() {
    const buildData = {
      skills: this.state.allocatedSkills,
      summary: {
        skillPoints: this.state.skillPoints,
        bookPoints: this.state.bookPoints,
        totalPoints: this.state.skillPoints + this.state.bookPoints,
      },
    }

    const buildString = JSON.stringify(buildData, null, 2)
    console.log("Build Export:", buildString)
    alert("Build exported to console! Check browser developer tools.")
  }

  // ... (other methods remain the same)
}

// Initialize the calculator when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.enhancedCalculator = new EnhancedJadeonCalculator()
})

console.log("[v0] Enhanced calculator file cleared - using original calculator")
