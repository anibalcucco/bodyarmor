#!/usr/bin/env ruby
require File.dirname(__FILE__) + '/../config/environment.rb'

if defined? CSV
  csv = CSV
else
  csv = FasterCSV
end

csv.open("stores2.csv", "w") do |file|
  file << [ 'Name', 'Street', 'City', 'Zip' ]

  Store.all.each do |store|
    street, city, zip = store.address.split(", ")
    file << [ store.name, street, city, zip ]
  end
end