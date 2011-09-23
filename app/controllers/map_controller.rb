class MapController < ApplicationController

  def index
    #@location = request.location
    @location = Geocoder.search("40.74,-73.6136").first
  end

end