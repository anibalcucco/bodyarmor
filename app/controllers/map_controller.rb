class MapController < ApplicationController

  before_filter :load_location
  before_filter :validate_location, :only => :near

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
    if params[:address].present?
      @location = Geocoder.search(params[:address]).first
    else
      @location = request.location
    end
  end

  def validate_location
    unless @location.present?
      render :json => { :stores => [] }
    end
  end

end