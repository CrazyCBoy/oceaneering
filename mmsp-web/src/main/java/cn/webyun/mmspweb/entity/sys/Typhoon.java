package cn.webyun.mmspweb.entity.sys;

import java.io.Serializable;

public class Typhoon implements Serializable {
    private Integer id;

    private String typhoonCode;

    private String typhoonName;

    private String dataDate;

    private String dateLimit;

    private String lon;

    private String lat;

    private String airPressure;

    private String windSpeed;

    private String level7R;

    private String level10R;

    private String level12R;

    private String direction;

    private String speed;

    private String typhoonType;

    private String dataArea;

    private String numInati;

    private String startingtime;

    private static final long serialVersionUID = 1L;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTyphoonCode() {
        return typhoonCode;
    }

    public void setTyphoonCode(String typhoonCode) {
        this.typhoonCode = typhoonCode == null ? null : typhoonCode.trim();
    }

    public String getTyphoonName() {
        return typhoonName;
    }

    public void setTyphoonName(String typhoonName) {
        this.typhoonName = typhoonName == null ? null : typhoonName.trim();
    }

    public String getDataDate() {
        return dataDate;
    }

    public void setDataDate(String dataDate) {
        this.dataDate = dataDate == null ? null : dataDate.trim();
    }

    public String getDateLimit() {
        return dateLimit;
    }

    public void setDateLimit(String dateLimit) {
        this.dateLimit = dateLimit == null ? null : dateLimit.trim();
    }

    public String getLon() {
        return lon;
    }

    public void setLon(String lon) {
        this.lon = lon == null ? null : lon.trim();
    }

    public String getLat() {
        return lat;
    }

    public void setLat(String lat) {
        this.lat = lat == null ? null : lat.trim();
    }

    public String getAirPressure() {
        return airPressure;
    }

    public void setAirPressure(String airPressure) {
        this.airPressure = airPressure == null ? null : airPressure.trim();
    }

    public String getWindSpeed() {
        return windSpeed;
    }

    public void setWindSpeed(String windSpeed) {
        this.windSpeed = windSpeed == null ? null : windSpeed.trim();
    }

    public String getLevel7R() {
        return level7R;
    }

    public void setLevel7R(String level7R) {
        this.level7R = level7R == null ? null : level7R.trim();
    }

    public String getLevel10R() {
        return level10R;
    }

    public void setLevel10R(String level10R) {
        this.level10R = level10R == null ? null : level10R.trim();
    }

    public String getLevel12R() {
        return level12R;
    }

    public void setLevel12R(String level12R) {
        this.level12R = level12R == null ? null : level12R.trim();
    }

    public String getDirection() {
        return direction;
    }

    public void setDirection(String direction) {
        this.direction = direction == null ? null : direction.trim();
    }

    public String getSpeed() {
        return speed;
    }

    public void setSpeed(String speed) {
        this.speed = speed == null ? null : speed.trim();
    }

    public String getTyphoonType() {
        return typhoonType;
    }

    public void setTyphoonType(String typhoonType) {
        this.typhoonType = typhoonType == null ? null : typhoonType.trim();
    }

    public String getDataArea() {
        return dataArea;
    }

    public void setDataArea(String dataArea) {
        this.dataArea = dataArea == null ? null : dataArea.trim();
    }

    public String getNumInati() {
        return numInati;
    }

    public void setNumInati(String numInati) {
        this.numInati = numInati == null ? null : numInati.trim();
    }

    public String getStartingtime() {
        return startingtime;
    }

    public void setStartingtime(String startingtime) {
        this.startingtime = startingtime == null ? null : startingtime.trim();
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", id=").append(id);
        sb.append(", typhoonCode=").append(typhoonCode);
        sb.append(", typhoonName=").append(typhoonName);
        sb.append(", dataDate=").append(dataDate);
        sb.append(", dateLimit=").append(dateLimit);
        sb.append(", lon=").append(lon);
        sb.append(", lat=").append(lat);
        sb.append(", airPressure=").append(airPressure);
        sb.append(", windSpeed=").append(windSpeed);
        sb.append(", level7R=").append(level7R);
        sb.append(", level10R=").append(level10R);
        sb.append(", level12R=").append(level12R);
        sb.append(", direction=").append(direction);
        sb.append(", speed=").append(speed);
        sb.append(", typhoonType=").append(typhoonType);
        sb.append(", dataArea=").append(dataArea);
        sb.append(", numInati=").append(numInati);
        sb.append(", startingtime=").append(startingtime);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }
}