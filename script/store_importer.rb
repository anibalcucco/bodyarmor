#!/usr/bin/env ruby
require File.dirname(__FILE__) + '/../config/environment.rb'

if defined? CSV
  csv = CSV
else
  csv = FasterCSV
end

created = 0
exist   = 0
failed  = 0

unless ARGV.length == 1
  puts "Dude, not the right number of arguments."
  puts "Usage (from project root): ruby script/store_importer.rb db/stores/california.csv\n"
  puts "To push to heroku: heroku db:push --tables stores\n"
  exit
end

duration = Benchmark.realtime do
  csv.foreach(ARGV[0], :headers => :first_row) do |row|
    if row[0].present? && row[1].present? && row[2].present? && row[3].present?
      name    = row[0].strip
      street  = row[1].strip
      city    = row[2].strip
      zip     = row[3].strip
      address = "#{street}, #{city}, #{zip}"
      if Store.find_by_address(address)
        exist += 1
        puts "Store already exists: #{name} - #{address}"
      else
        begin
          Store.create!(:name => name, :address => address)
          created += 1
          puts "Store created: #{name} - #{address}"
        rescue ActiveRecord::RecordInvalid => e
          failed += 1
          puts "Store failed: #{name} - #{address}. Error: #{e.message}"
        end
      end
    else
      failed += 1
      puts "Store failed for missing data: #{row[0]} - #{row[1]}, #{row[2]}, #{row[3]}"
    end
  end
end

puts "\n"
puts "Store import process finished in #{duration}s"

puts "#{created} stores have been created"
puts "#{exist} stores were already in the db"
puts "#{failed} stores have failed. See logs for details on failures."
