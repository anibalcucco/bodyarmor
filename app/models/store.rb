class Store < ActiveRecord::Base
  acts_as_mappable :default_units => :miles, 
                   :default_formula => :sphere, 
                   :distance_field_name => :distance,
                   :lat_column_name => :latitude,
                   :lng_column_name => :longitude

  geocoded_by :address
  after_validation :geocode

  validates_presence_of :name, :address
end
