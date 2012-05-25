#!/usr/bin/env ruby
require File.dirname(__FILE__) + '/../config/environment.rb'

if defined? CSV
  csv = CSV
else
  csv = FasterCSV
end

unless ARGV.length == 1
  puts "Dude, not the right number of arguments."
  puts "Usage (from project root): ruby script/store_exporter.rb db/stores/stores_05_24_12.csv\n"
  exit
end

csv.open(ARGV[0], "w") do |file|
  file << [ 'Name', 'Street', 'City', 'Zip' ]

  Store.all.each do |store|
    street, city, zip = store.address.split(", ")
    file << [ store.name, street, city, zip ]
  end
end