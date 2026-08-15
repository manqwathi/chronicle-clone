# frozen_string_literal: true
require 'json'
require 'time'

def merge_clone_backups(file1_path, file2_path, output_path)
  # Load and parse the raw JSON data streams
  data1 = JSON.parse(File.read(file1_path))
  data2 = JSON.parse(File.read(file2_path))

  # Initialize the master unified blueprint manifest
  merged_manifest = {
    "assemblyMeta" => {
      "compiledTimestamp" => Time.now.utc.iso8601,
      "officeEngineSignature" => "ruby_sandbox_assembler_v1.0",
      "assignedHardwareName" => data1.dig("assemblyMeta", "assignedHardwareName") || "CLONE-BOT"
    },
    "babyBobIntelligenceMetrics" => {},
    "structuralDataVaults" => { "research" => [], "lyric" => [], "notes" => [], "language" => [], "word" => [], "letter" => [], "term" => [], "reminders" => [] },
    "historicalInteractionNodes" => []
  }

  # 1. Synthesize Baby Bob developmental metrics (Take the most advanced growth metrics)
  b1 = data1["babyBobIntelligenceMetrics"] || {}
  b2 = data2["babyBobIntelligenceMetrics"] || {}
  merged_manifest["babyBobIntelligenceMetrics"] = {
    "stage" => (b1["wordsMasteredCount"].to_i >= b2["wordsMasteredCount"].to_i) ? b1["stage"] : b2["stage"],
    "ageEquivalencyMonths" => [b1["ageEquivalencyMonths"].to_i, b2["ageEquivalencyMonths"].to_i].max,
    "wordsMasteredCount" => [b1["wordsMasteredCount"].to_i, b2["wordsMasteredCount"].to_i].max,
    "emotionalSecurityScore" => [b1["emotionalSecurityScore"].to_i, b2["emotionalSecurityScore"].to_i].max,
    "currentDayIndex" => [b1["currentDayIndex"].to_i, b2["currentDayIndex"].to_i].max,
    "absorbedNouns" => ((b1["absorbedNouns"] || []) + (b2["absorbedNouns"] || [])).uniq,
    "absorbedVerbs" => ((b1["absorbedVerbs"] || []) + (b2["absorbedVerbs"] || [])).uniq,
    "milestonesUnlocked" => ((b1["milestonesUnlocked"] || []) + (b2["milestonesUnlocked"] || [])).uniq
  }

  # 2. Merge Structural Folders and resolve duplicate tracking slot lines
  categories = ["research", "lyric", "notes", "language", "word", "letter", "term", "reminders"]
  categories.forEach do |cat|
    v1 = data1.dig("structuralDataVaults", cat) || []
    v2 = data2.dig("structuralDataVaults", cat) || []
    combined_raw = v1 + v2
    
    unique_items = {}
    combined_raw.each do |item|
      # Avoid over-writing unique names; map by combined file path identity keys
      key = "#{item['filename']}_#{item['line']}"
      unique_items[key] = item
    end
    merged_manifest["structuralDataVaults"][cat] = unique_items.values.sort_by { |i| i["line"].to_i }
  end

  # 3. Aggregate historical timeline tracking rows chronologically
  h1 = data1["historicalInteractionNodes"] || []
  h2 = data2["historicalInteractionNodes"] || []
  merged_manifest["historicalInteractionNodes"] = (h1 + h2).uniq { |node| node["id"] }.sort_by { |node| node["timestamp"] }

  # Output the sealed file back onto physical device storage
  File.write(output_path, JSON.pretty_generate(merged_manifest))
  puts "[RUBY INTERCEPT] Successfully compiled backup streams into master file: #{output_path}"
end

# Execution pipeline command hook sample:
# merge_clone_backups('clone_mobile_backup.json', 'clone_desktop_backup.json', 'master_assembly.json')


# ADVANCED RUBY PARSER & NEURAL COMPILER
# This backend utility merges JSON snapshots and translates human slang/terms 
# into fully parsed structural data fields for the clone's expanded brain.
class NeuralParser
  # Core structural mappings for the extended brain architecture
  BRAIN_STRUCTURES = %w[amygdala neocortex hippocampus prefrontal_cortex cerebellum basal_ganglia].freeze

  def initialize(file_path_a, file_path_b)
    @data_a = JSON.parse(File.read(file_path_a)) rescue {}
    @data_b = JSON.parse(File.read(file_path_b)) rescue {}
    @merged_manifest = {}
  end

  # Primary translation engine compiling and merging local tracking files
  def compile_and_merge(output_path)
    @merged_manifest = {
      "assemblyMeta" => {
        "compiledTimestamp" => Time.now.utc.iso8601,
        "officeEngineSignature" => "ruby_neural_parser_v2.0",
        "assignedHardwareName" => @data_a.dig("assemblyMeta", "assignedHardwareName") || "CLONE-BOT"
      },
      "babyBobIntelligenceMetrics" => merge_development_metrics,
      "structuralDataVaults" => merge_vault_categories,
      "historicalInteractionNodes" => merge_history_nodes
    }

    File.write(output_path, JSON.pretty_generate(@merged_manifest))
    puts "[RUBY NEURAL PARSER] Successfully expanded brain profiles and saved to: #{output_path}"
  end

  private

  def merge_development_metrics
    b1 = @data_a["babyBobIntelligenceMetrics"] || {}
    b2 = @data_b["babyBobIntelligenceMetrics"] || {}
    
    {
      "stage" => b1["wordsMasteredCount"].to_i >= b2["wordsMasteredCount"].to_i ? b1["stage"] : b2["stage"],
      "ageEquivalencyMonths" => [b1["ageEquivalencyMonths"].to_i, b2["ageEquivalencyMonths"].to_i].max,
      "wordsMasteredCount" => [b1["wordsMasteredCount"].to_i, b2["wordsMasteredCount"].to_i].max,
      "emotionalSecurityScore" => [b1["emotionalSecurityScore"].to_i, b2["emotionalSecurityScore"].to_i].max,
      "currentDayIndex" => [b1["currentDayIndex"].to_i, b2["currentDayIndex"].to_i].max,
      "absorbedNouns" => ((b1["absorbedNouns"] || []) + (b2["absorbedNouns"] || [])).uniq,
      "absorbedVerbs" => ((b1["absorbedVerbs"] || []) + (b2["absorbedVerbs"] || [])).uniq,
      "milestonesUnlocked" => ((b1["milestonesUnlocked"] || []) + (b2["milestonesUnlocked"] || [])).uniq
    }
  end

  def merge_vault_categories
    categories = %w[research lyric notes language word letter term reminders]
    vault = {}
    
    categories.each do |cat|
      v1 = @data_a.dig("structuralDataVaults", cat) || []
      v2 = @data_b.dig("structuralDataVaults", cat) || []
      combined = v1 + v2
      
      unique_items = {}
      combined.each do |item|
        key = "#{item['filename']}_#{item['line']}"
        unique_items[key] = item
      end
      vault[cat] = unique_items.values.sort_by { |i| i["line"].to_i }
    end
    vault
  end

  def merge_history_nodes
    h1 = @data_a["historicalInteractionNodes"] || []
    h2 = @data_b["historicalInteractionNodes"] || []
    
    # Process history logs while standardising the newly introduced biological brain lobes
    combined_history = h1 + h2
    unique_nodes = {}

    combined_history.each do |node|
      node_id = node["id"]
      
      # Inject missing deep cognitive arrays if an older JSON layout file is read
      if node["cognitiveProfile"] && !node["cognitiveProfile"].key?("prefrontalCortexData")
        node["cognitiveProfile"]["prefrontalCortexData"] = "Uncalibrated baseline reasoning trace."
        node["cognitiveProfile"]["cerebellumData"]        = "Ambient balance parameters verified."
        node["cognitiveProfile"]["basalGangliaData"]       = "Motor coordination at resting value."
      end

      unique_nodes[node_id] = node
    end

    unique_nodes.values.sort_by { |node| node["timestamp"] || "" }
  end
end

# Execution invoke pipeline example:
# NeuralParser.new('mobile_snapshot.json', 'desktop_snapshot.json').compile_and_merge('expanded_brain_manifest.json')
# frozen_string_literal: true
require 'json'
require 'time'

# ADVANCED CHRONO-ROUTINE DATA ASSEMBLER
class NeuralParser
  ROUTINE_KEYS = %w[bed_time waking_time duty_time relaxation_time].freeze

  def initialize(file_path_a, file_path_b)
    @data_a = JSON.parse(File.read(file_path_a)) rescue {}
    @data_b = JSON.parse(File.read(file_path_b)) rescue {}
    @merged_manifest = {}
  end

  def compile_and_merge(output_path)
    @merged_manifest = {
      "assemblyMeta" => {
        "compiledTimestamp" => Time.now.utc.iso8601,
        "officeEngineSignature" => "ruby_neural_parser_v3.0",
        "assignedHardwareName" => @data_a.dig("assemblyMeta", "assignedHardwareName") || "CLONE-BOT"
      },
      "nurserySchedules" => compile_maintenance_routines,
      "babyBobIntelligenceMetrics" => merge_development_metrics,
      "structuralDataVaults" => merge_vault_categories,
      "historicalInteractionNodes" => merge_history_nodes
    }

    File.write(output_path, JSON.pretty_generate(@merged_manifest))
    puts "[RUBY ARCHITECT] Unified 24hr biological schedules and saved to: #{output_path}"
  end

  private

  def compile_maintenance_routines
    # Extract time slots or apply optimal structural nursery defaults
    r1 = @data_a["nurserySchedules"] || {}
    r2 = @data_b["nurserySchedules"] || {}
    
    {
      "bed_time"        => r1["bed_time"] || r2["bed_time"] || "21:00",
      "waking_time"     => r1["waking_time"] || r2["waking_time"] || "06:00",
      "duty_time"       => r1["duty_time"] || r2["duty_time"] || "08:00-14:00",
      "relaxation_time" => r1["relaxation_time"] || r2["relaxation_time"] || "16:00-18:00",
      "maintenanceLogs" => ((r1["maintenanceLogs"] || []) + (r2["maintenanceLogs"] || [])).uniq
    }
  end

  def merge_development_metrics
    b1 = @data_a["babyBobIntelligenceMetrics"] || {}
    b2 = @data_b["babyBobIntelligenceMetrics"] || {}
    {
      "stage" => b1["wordsMasteredCount"].to_i >= b2["wordsMasteredCount"].to_i ? b1["stage"] : b2["stage"],
      "ageEquivalencyMonths" => [b1["ageEquivalencyMonths"].to_i, b2["ageEquivalencyMonths"].to_i].max,
      "wordsMasteredCount" => [b1["wordsMasteredCount"].to_i, b2["wordsMasteredCount"].to_i].max,
      "currentDayIndex" => [b1["currentDayIndex"].to_i, b2["currentDayIndex"].to_i].max
    }
  end

  def merge_vault_categories
    categories = %w[research lyric notes language word letter term reminders command naming collaborate preference lesson tutor illegal_registry]
    vault = {}
    categories.each do |cat|
      v1 = @data_a.dig("structuralDataVaults", cat) || []
      v2 = @data_b.dig("structuralDataVaults", cat) || []
      combined = v1 + v2
      unique_items = {}
      combined.each { |item| unique_items["#{item['filename']}_#{item['line']}"] = item }
      vault[cat] = unique_items.values.sort_by { |i| i["line"].to_i }
    end
    vault
  end

  def merge_history_nodes
    h1 = @data_a["historicalInteractionNodes"] || []
    h2 = @data_b["historicalInteractionNodes"] || []
    (h1 + h2).uniq { |node| node["id"] }.sort_by { |node| node["timestamp"] || "" }
  end
end
