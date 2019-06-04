package cn.webyun.mmspweb.model;

import lombok.Data;

@Data
public class LonLat {
    private float lonmin;
    private float lonmax;
    private float latmin;
    private float latmax;

    public float getLonmin() {
        return lonmin;
    }

    public void setLonmin(float lonmin) {
        this.lonmin = lonmin;
    }

    public float getLonmax() {
        return lonmax;
    }

    public void setLonmax(float lonmax) {
        this.lonmax = lonmax;
    }

    public float getLatmin() {
        return latmin;
    }

    public void setLatmin(float latmin) {
        this.latmin = latmin;
    }

    public float getLatmax() {
        return latmax;
    }

    public void setLatmax(float latmax) {
        this.latmax = latmax;
    }
}
