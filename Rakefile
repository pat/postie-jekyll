# frozen_string_literal: true

require "csv"
require "gyoku"
require "json"
require "yaml"

def generate_files(context, subset)
  file = File.open "./#{context}.html", 'w'
  file.puts YAML.dump(
    "layout" => "results",
    "context" => context.to_s,
    "localities" => subset.collect(&:serializable_hash)
  )
  file.puts "---"
  file.close

  file = File.open "./#{context}.json", 'w'
  file.puts JSON.dump(
    subset.collect(&:serializable_hash)
  )
  file.close

  file = File.open "./#{context}.xml", 'w'
  file.puts Gyoku.xml(
    localities: {locality: subset.collect(&:serializable_hash)}
  )
  file.close
end

task :build_pages do
  localities = Localities.new

  postcodes = localities.collect(&:postcode).uniq

  postcodes[0..10].each do |postcode|
    generate_files postcode, localities.by_postcode(postcode)
  end

  words = localities
    .collect(&:suburb)
    .collect(&:downcase)
    .collect { |suburb| suburb.gsub(/[^a-z\s]/, "").split(" ") }
    .flatten.uniq

  words.each do |word|
    generate_files word, localities.by_suburb(word)
  end
end

class Localities
  PATH = File.expand_path "./_db/localities.csv", __dir__

  include Enumerable

  def initialize
    @localities = CSV.read(PATH, :headers => true).collect do |row|
      Locality.new row
    end
  end

  def each(&block)
    localities.each(&block)
  end

  def by_postcode(postcode)
    localities.select { |locality| locality.postcode == postcode }
  end

  def by_suburb(suburb)
    suburb = suburb.downcase

    localities.select { |locality| locality.suburb.downcase[suburb] }
  end

  private

  attr_reader :localities
end

class Locality
  attr_reader :postcode, :suburb, :state, :comments

  def initialize(row)
    @postcode = row["postcode"]
    @suburb   = row["suburb"]
    @state    = row["state"]
    @comments = row["comments"]
  end

  def serializable_hash
    {
      "postcode" => postcode,
      "suburb"   => suburb,
      "state"    => state,
      "comments" => comments
    }
  end
end
