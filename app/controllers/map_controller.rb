class MapController < ApplicationController

  before_filter :load_location

  def index
  end

  def near
    @stores = Store.near(@location.address, params[:within] || 5, :order => "distance")

    render :json => { :stores   => @stores,
                      :location => { :address => @location.address,
                                     :latitude => @location.latitude,
                                     :longitude => @location.longitude } }
  end

  private

  def load_location
    if params[:address]
      @location = Geocoder.search(params[:address]).first
    else
      @location = request.location
      # use this in dev
      # @location = Geocoder.search("90210").first
    end
  end

end