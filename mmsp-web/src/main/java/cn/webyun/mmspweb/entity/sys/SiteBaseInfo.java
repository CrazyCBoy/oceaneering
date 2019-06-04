package cn.webyun.mmspweb.entity.sys;

import java.io.Serializable;

public class SiteBaseInfo implements Serializable {

    private Float lat;
    private Float lon;
    private String stationIdC;
    private Integer stationIdD;
    private String stationName;
    private String stationType;

    public Float getLat() {
        return lat;
    }

    public void setLat(Float lat) {
        this.lat = lat;
    }

    public Float getLon() {
        return lon;
    }

    public void setLon(Float lon) {
        this.lon = lon;
    }

    public String getStationIdC() {
        return stationIdC;
    }

    public void setStationIdC(String stationIdC) {
        this.stationIdC = stationIdC;
    }

    public Integer getStationIdD() {
        return stationIdD;
    }

    public void setStationIdD(Integer stationIdD) {
        this.stationIdD = stationIdD;
    }

    public String getStationName() {
        return stationName;
    }

    public void setStationName(String stationName) {
        this.stationName = stationName;
    }

    public String getStationType() {
        return stationType;
    }

    public void setStationType(String stationType) {
        this.stationType = stationType;
    }
}
