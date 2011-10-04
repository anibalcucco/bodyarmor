class StoresController < ApplicationController
  before_filter :authenticate_user!, :except => [:near, :preview]

  before_filter :load_location, :only => :near
  before_filter :load_store, :except => [:index, :near, :new, :create]

  def near
    @stores = Store.near(@location.address, 25, :order => "distance")

    respond_to do |format|
      format.html {}
      format.json { render :json => { :stores   => @stores,
                                      :location => { :address => @location.address,
                                                     :latitude => @location.latitude,
                                                     :longitude => @location.longitude } } }
    end
  end

  def preview
    render :layout => false
  end

  def index
    @stores = Store.all
  end

  def show
  end

  def new
    @store = Store.new
  end

  def edit
  end

  def create
    @store = Store.new(params[:store])
    respond_to do |format|
      if @store.save
        format.html { redirect_to(@store, :notice => 'Store was successfully created.') }
      else
        format.html { render :action => "new" }
      end
    end
  end

  def update
    respond_to do |format|
      if @store.update_attributes(params[:store])
        format.html { redirect_to(@store, :notice => 'Store was successfully updated.') }
      else
        format.html { render :action => "edit" }
      end
    end
  end

  def destroy
    @store.destroy
    redirect_to stores_url
  end

  private

  def load_location
    if params[:address]
      @location = Geocoder.search(params[:address]).first
    else
      @location = request.location
      # use this in dev
      # @location = Geocoder.search("8800 Venice Blvd, Los Angeles, California, 90034").first
    end
  end

  def normalize(address)
    address.mb_chars.normalize(:kd).gsub(/[^\x00-\x7F]/n,'').to_s
  end

  def load_store
    @store = Store.find(params[:id])
  end

end
