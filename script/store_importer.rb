#!/usr/bin/env ruby
require File.dirname(__FILE__) + '/../config/environment.rb'

created = 0
exist   = 0
failed  = 0

duration = Benchmark.realtime do
  FasterCSV.foreach("script/california.csv", :headers => :first_row) do |row|
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
  end
end

puts "\n"
puts "Store import process finished in #{duration}s"

puts "#{created} stores have been created"
puts "#{exist} stores were already in the db"
puts "#{failed} stores have failed. See logs for details on failures."
