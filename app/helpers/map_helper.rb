module MapHelper

  def postal_code
    @location.postal_code.present? ? @location.postal_code : 90210
  end

end