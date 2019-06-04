package cn.webyun.mmspweb.entity.sys;

import java.util.ArrayList;
import java.util.List;

public class TyphoonCriteria {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public TyphoonCriteria() {
        oredCriteria = new ArrayList<Criteria>();
    }

    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    public String getOrderByClause() {
        return orderByClause;
    }

    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    public boolean isDistinct() {
        return distinct;
    }

    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andIdIsNull() {
            addCriterion("id is null");
            return (Criteria) this;
        }

        public Criteria andIdIsNotNull() {
            addCriterion("id is not null");
            return (Criteria) this;
        }

        public Criteria andIdEqualTo(Integer value) {
            addCriterion("id =", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotEqualTo(Integer value) {
            addCriterion("id <>", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThan(Integer value) {
            addCriterion("id >", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("id >=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThan(Integer value) {
            addCriterion("id <", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThanOrEqualTo(Integer value) {
            addCriterion("id <=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdIn(List<Integer> values) {
            addCriterion("id in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotIn(List<Integer> values) {
            addCriterion("id not in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdBetween(Integer value1, Integer value2) {
            addCriterion("id between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotBetween(Integer value1, Integer value2) {
            addCriterion("id not between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andTyphoonCodeIsNull() {
            addCriterion("typhoon_code is null");
            return (Criteria) this;
        }

        public Criteria andTyphoonCodeIsNotNull() {
            addCriterion("typhoon_code is not null");
            return (Criteria) this;
        }

        public Criteria andTyphoonCodeEqualTo(String value) {
            addCriterion("typhoon_code =", value, "typhoonCode");
            return (Criteria) this;
        }

        public Criteria andTyphoonCodeNotEqualTo(String value) {
            addCriterion("typhoon_code <>", value, "typhoonCode");
            return (Criteria) this;
        }

        public Criteria andTyphoonCodeGreaterThan(String value) {
            addCriterion("typhoon_code >", value, "typhoonCode");
            return (Criteria) this;
        }

        public Criteria andTyphoonCodeGreaterThanOrEqualTo(String value) {
            addCriterion("typhoon_code >=", value, "typhoonCode");
            return (Criteria) this;
        }

        public Criteria andTyphoonCodeLessThan(String value) {
            addCriterion("typhoon_code <", value, "typhoonCode");
            return (Criteria) this;
        }

        public Criteria andTyphoonCodeLessThanOrEqualTo(String value) {
            addCriterion("typhoon_code <=", value, "typhoonCode");
            return (Criteria) this;
        }

        public Criteria andTyphoonCodeLike(String value) {
            addCriterion("typhoon_code like", value, "typhoonCode");
            return (Criteria) this;
        }

        public Criteria andTyphoonCodeNotLike(String value) {
            addCriterion("typhoon_code not like", value, "typhoonCode");
            return (Criteria) this;
        }

        public Criteria andTyphoonCodeIn(List<String> values) {
            addCriterion("typhoon_code in", values, "typhoonCode");
            return (Criteria) this;
        }

        public Criteria andTyphoonCodeNotIn(List<String> values) {
            addCriterion("typhoon_code not in", values, "typhoonCode");
            return (Criteria) this;
        }

        public Criteria andTyphoonCodeBetween(String value1, String value2) {
            addCriterion("typhoon_code between", value1, value2, "typhoonCode");
            return (Criteria) this;
        }

        public Criteria andTyphoonCodeNotBetween(String value1, String value2) {
            addCriterion("typhoon_code not between", value1, value2, "typhoonCode");
            return (Criteria) this;
        }

        public Criteria andTyphoonNameIsNull() {
            addCriterion("typhoon_name is null");
            return (Criteria) this;
        }

        public Criteria andTyphoonNameIsNotNull() {
            addCriterion("typhoon_name is not null");
            return (Criteria) this;
        }

        public Criteria andTyphoonNameEqualTo(String value) {
            addCriterion("typhoon_name =", value, "typhoonName");
            return (Criteria) this;
        }

        public Criteria andTyphoonNameNotEqualTo(String value) {
            addCriterion("typhoon_name <>", value, "typhoonName");
            return (Criteria) this;
        }

        public Criteria andTyphoonNameGreaterThan(String value) {
            addCriterion("typhoon_name >", value, "typhoonName");
            return (Criteria) this;
        }

        public Criteria andTyphoonNameGreaterThanOrEqualTo(String value) {
            addCriterion("typhoon_name >=", value, "typhoonName");
            return (Criteria) this;
        }

        public Criteria andTyphoonNameLessThan(String value) {
            addCriterion("typhoon_name <", value, "typhoonName");
            return (Criteria) this;
        }

        public Criteria andTyphoonNameLessThanOrEqualTo(String value) {
            addCriterion("typhoon_name <=", value, "typhoonName");
            return (Criteria) this;
        }

        public Criteria andTyphoonNameLike(String value) {
            addCriterion("typhoon_name like", value, "typhoonName");
            return (Criteria) this;
        }

        public Criteria andTyphoonNameNotLike(String value) {
            addCriterion("typhoon_name not like", value, "typhoonName");
            return (Criteria) this;
        }

        public Criteria andTyphoonNameIn(List<String> values) {
            addCriterion("typhoon_name in", values, "typhoonName");
            return (Criteria) this;
        }

        public Criteria andTyphoonNameNotIn(List<String> values) {
            addCriterion("typhoon_name not in", values, "typhoonName");
            return (Criteria) this;
        }

        public Criteria andTyphoonNameBetween(String value1, String value2) {
            addCriterion("typhoon_name between", value1, value2, "typhoonName");
            return (Criteria) this;
        }

        public Criteria andTyphoonNameNotBetween(String value1, String value2) {
            addCriterion("typhoon_name not between", value1, value2, "typhoonName");
            return (Criteria) this;
        }

        public Criteria andDataDateIsNull() {
            addCriterion("data_date is null");
            return (Criteria) this;
        }

        public Criteria andDataDateIsNotNull() {
            addCriterion("data_date is not null");
            return (Criteria) this;
        }

        public Criteria andDataDateEqualTo(String value) {
            addCriterion("data_date =", value, "dataDate");
            return (Criteria) this;
        }

        public Criteria andDataDateNotEqualTo(String value) {
            addCriterion("data_date <>", value, "dataDate");
            return (Criteria) this;
        }

        public Criteria andDataDateGreaterThan(String value) {
            addCriterion("data_date >", value, "dataDate");
            return (Criteria) this;
        }

        public Criteria andDataDateGreaterThanOrEqualTo(String value) {
            addCriterion("data_date >=", value, "dataDate");
            return (Criteria) this;
        }

        public Criteria andDataDateLessThan(String value) {
            addCriterion("data_date <", value, "dataDate");
            return (Criteria) this;
        }

        public Criteria andDataDateLessThanOrEqualTo(String value) {
            addCriterion("data_date <=", value, "dataDate");
            return (Criteria) this;
        }

        public Criteria andDataDateLike(String value) {
            addCriterion("data_date like", value, "dataDate");
            return (Criteria) this;
        }

        public Criteria andDataDateNotLike(String value) {
            addCriterion("data_date not like", value, "dataDate");
            return (Criteria) this;
        }

        public Criteria andDataDateIn(List<String> values) {
            addCriterion("data_date in", values, "dataDate");
            return (Criteria) this;
        }

        public Criteria andDataDateNotIn(List<String> values) {
            addCriterion("data_date not in", values, "dataDate");
            return (Criteria) this;
        }

        public Criteria andDataDateBetween(String value1, String value2) {
            addCriterion("data_date between", value1, value2, "dataDate");
            return (Criteria) this;
        }

        public Criteria andDataDateNotBetween(String value1, String value2) {
            addCriterion("data_date not between", value1, value2, "dataDate");
            return (Criteria) this;
        }

        public Criteria andDateLimitIsNull() {
            addCriterion("date_limit is null");
            return (Criteria) this;
        }

        public Criteria andDateLimitIsNotNull() {
            addCriterion("date_limit is not null");
            return (Criteria) this;
        }

        public Criteria andDateLimitEqualTo(String value) {
            addCriterion("date_limit =", value, "dateLimit");
            return (Criteria) this;
        }

        public Criteria andDateLimitNotEqualTo(String value) {
            addCriterion("date_limit <>", value, "dateLimit");
            return (Criteria) this;
        }

        public Criteria andDateLimitGreaterThan(String value) {
            addCriterion("date_limit >", value, "dateLimit");
            return (Criteria) this;
        }

        public Criteria andDateLimitGreaterThanOrEqualTo(String value) {
            addCriterion("date_limit >=", value, "dateLimit");
            return (Criteria) this;
        }

        public Criteria andDateLimitLessThan(String value) {
            addCriterion("date_limit <", value, "dateLimit");
            return (Criteria) this;
        }

        public Criteria andDateLimitLessThanOrEqualTo(String value) {
            addCriterion("date_limit <=", value, "dateLimit");
            return (Criteria) this;
        }

        public Criteria andDateLimitLike(String value) {
            addCriterion("date_limit like", value, "dateLimit");
            return (Criteria) this;
        }

        public Criteria andDateLimitNotLike(String value) {
            addCriterion("date_limit not like", value, "dateLimit");
            return (Criteria) this;
        }

        public Criteria andDateLimitIn(List<String> values) {
            addCriterion("date_limit in", values, "dateLimit");
            return (Criteria) this;
        }

        public Criteria andDateLimitNotIn(List<String> values) {
            addCriterion("date_limit not in", values, "dateLimit");
            return (Criteria) this;
        }

        public Criteria andDateLimitBetween(String value1, String value2) {
            addCriterion("date_limit between", value1, value2, "dateLimit");
            return (Criteria) this;
        }

        public Criteria andDateLimitNotBetween(String value1, String value2) {
            addCriterion("date_limit not between", value1, value2, "dateLimit");
            return (Criteria) this;
        }

        public Criteria andLonIsNull() {
            addCriterion("lon is null");
            return (Criteria) this;
        }

        public Criteria andLonIsNotNull() {
            addCriterion("lon is not null");
            return (Criteria) this;
        }

        public Criteria andLonEqualTo(String value) {
            addCriterion("lon =", value, "lon");
            return (Criteria) this;
        }

        public Criteria andLonNotEqualTo(String value) {
            addCriterion("lon <>", value, "lon");
            return (Criteria) this;
        }

        public Criteria andLonGreaterThan(String value) {
            addCriterion("lon >", value, "lon");
            return (Criteria) this;
        }

        public Criteria andLonGreaterThanOrEqualTo(String value) {
            addCriterion("lon >=", value, "lon");
            return (Criteria) this;
        }

        public Criteria andLonLessThan(String value) {
            addCriterion("lon <", value, "lon");
            return (Criteria) this;
        }

        public Criteria andLonLessThanOrEqualTo(String value) {
            addCriterion("lon <=", value, "lon");
            return (Criteria) this;
        }

        public Criteria andLonLike(String value) {
            addCriterion("lon like", value, "lon");
            return (Criteria) this;
        }

        public Criteria andLonNotLike(String value) {
            addCriterion("lon not like", value, "lon");
            return (Criteria) this;
        }

        public Criteria andLonIn(List<String> values) {
            addCriterion("lon in", values, "lon");
            return (Criteria) this;
        }

        public Criteria andLonNotIn(List<String> values) {
            addCriterion("lon not in", values, "lon");
            return (Criteria) this;
        }

        public Criteria andLonBetween(String value1, String value2) {
            addCriterion("lon between", value1, value2, "lon");
            return (Criteria) this;
        }

        public Criteria andLonNotBetween(String value1, String value2) {
            addCriterion("lon not between", value1, value2, "lon");
            return (Criteria) this;
        }

        public Criteria andLatIsNull() {
            addCriterion("lat is null");
            return (Criteria) this;
        }

        public Criteria andLatIsNotNull() {
            addCriterion("lat is not null");
            return (Criteria) this;
        }

        public Criteria andLatEqualTo(String value) {
            addCriterion("lat =", value, "lat");
            return (Criteria) this;
        }

        public Criteria andLatNotEqualTo(String value) {
            addCriterion("lat <>", value, "lat");
            return (Criteria) this;
        }

        public Criteria andLatGreaterThan(String value) {
            addCriterion("lat >", value, "lat");
            return (Criteria) this;
        }

        public Criteria andLatGreaterThanOrEqualTo(String value) {
            addCriterion("lat >=", value, "lat");
            return (Criteria) this;
        }

        public Criteria andLatLessThan(String value) {
            addCriterion("lat <", value, "lat");
            return (Criteria) this;
        }

        public Criteria andLatLessThanOrEqualTo(String value) {
            addCriterion("lat <=", value, "lat");
            return (Criteria) this;
        }

        public Criteria andLatLike(String value) {
            addCriterion("lat like", value, "lat");
            return (Criteria) this;
        }

        public Criteria andLatNotLike(String value) {
            addCriterion("lat not like", value, "lat");
            return (Criteria) this;
        }

        public Criteria andLatIn(List<String> values) {
            addCriterion("lat in", values, "lat");
            return (Criteria) this;
        }

        public Criteria andLatNotIn(List<String> values) {
            addCriterion("lat not in", values, "lat");
            return (Criteria) this;
        }

        public Criteria andLatBetween(String value1, String value2) {
            addCriterion("lat between", value1, value2, "lat");
            return (Criteria) this;
        }

        public Criteria andLatNotBetween(String value1, String value2) {
            addCriterion("lat not between", value1, value2, "lat");
            return (Criteria) this;
        }

        public Criteria andAirPressureIsNull() {
            addCriterion("air_pressure is null");
            return (Criteria) this;
        }

        public Criteria andAirPressureIsNotNull() {
            addCriterion("air_pressure is not null");
            return (Criteria) this;
        }

        public Criteria andAirPressureEqualTo(String value) {
            addCriterion("air_pressure =", value, "airPressure");
            return (Criteria) this;
        }

        public Criteria andAirPressureNotEqualTo(String value) {
            addCriterion("air_pressure <>", value, "airPressure");
            return (Criteria) this;
        }

        public Criteria andAirPressureGreaterThan(String value) {
            addCriterion("air_pressure >", value, "airPressure");
            return (Criteria) this;
        }

        public Criteria andAirPressureGreaterThanOrEqualTo(String value) {
            addCriterion("air_pressure >=", value, "airPressure");
            return (Criteria) this;
        }

        public Criteria andAirPressureLessThan(String value) {
            addCriterion("air_pressure <", value, "airPressure");
            return (Criteria) this;
        }

        public Criteria andAirPressureLessThanOrEqualTo(String value) {
            addCriterion("air_pressure <=", value, "airPressure");
            return (Criteria) this;
        }

        public Criteria andAirPressureLike(String value) {
            addCriterion("air_pressure like", value, "airPressure");
            return (Criteria) this;
        }

        public Criteria andAirPressureNotLike(String value) {
            addCriterion("air_pressure not like", value, "airPressure");
            return (Criteria) this;
        }

        public Criteria andAirPressureIn(List<String> values) {
            addCriterion("air_pressure in", values, "airPressure");
            return (Criteria) this;
        }

        public Criteria andAirPressureNotIn(List<String> values) {
            addCriterion("air_pressure not in", values, "airPressure");
            return (Criteria) this;
        }

        public Criteria andAirPressureBetween(String value1, String value2) {
            addCriterion("air_pressure between", value1, value2, "airPressure");
            return (Criteria) this;
        }

        public Criteria andAirPressureNotBetween(String value1, String value2) {
            addCriterion("air_pressure not between", value1, value2, "airPressure");
            return (Criteria) this;
        }

        public Criteria andWindSpeedIsNull() {
            addCriterion("wind_speed is null");
            return (Criteria) this;
        }

        public Criteria andWindSpeedIsNotNull() {
            addCriterion("wind_speed is not null");
            return (Criteria) this;
        }

        public Criteria andWindSpeedEqualTo(String value) {
            addCriterion("wind_speed =", value, "windSpeed");
            return (Criteria) this;
        }

        public Criteria andWindSpeedNotEqualTo(String value) {
            addCriterion("wind_speed <>", value, "windSpeed");
            return (Criteria) this;
        }

        public Criteria andWindSpeedGreaterThan(String value) {
            addCriterion("wind_speed >", value, "windSpeed");
            return (Criteria) this;
        }

        public Criteria andWindSpeedGreaterThanOrEqualTo(String value) {
            addCriterion("wind_speed >=", value, "windSpeed");
            return (Criteria) this;
        }

        public Criteria andWindSpeedLessThan(String value) {
            addCriterion("wind_speed <", value, "windSpeed");
            return (Criteria) this;
        }

        public Criteria andWindSpeedLessThanOrEqualTo(String value) {
            addCriterion("wind_speed <=", value, "windSpeed");
            return (Criteria) this;
        }

        public Criteria andWindSpeedLike(String value) {
            addCriterion("wind_speed like", value, "windSpeed");
            return (Criteria) this;
        }

        public Criteria andWindSpeedNotLike(String value) {
            addCriterion("wind_speed not like", value, "windSpeed");
            return (Criteria) this;
        }

        public Criteria andWindSpeedIn(List<String> values) {
            addCriterion("wind_speed in", values, "windSpeed");
            return (Criteria) this;
        }

        public Criteria andWindSpeedNotIn(List<String> values) {
            addCriterion("wind_speed not in", values, "windSpeed");
            return (Criteria) this;
        }

        public Criteria andWindSpeedBetween(String value1, String value2) {
            addCriterion("wind_speed between", value1, value2, "windSpeed");
            return (Criteria) this;
        }

        public Criteria andWindSpeedNotBetween(String value1, String value2) {
            addCriterion("wind_speed not between", value1, value2, "windSpeed");
            return (Criteria) this;
        }

        public Criteria andLevel7RIsNull() {
            addCriterion("level7_r is null");
            return (Criteria) this;
        }

        public Criteria andLevel7RIsNotNull() {
            addCriterion("level7_r is not null");
            return (Criteria) this;
        }

        public Criteria andLevel7REqualTo(String value) {
            addCriterion("level7_r =", value, "level7R");
            return (Criteria) this;
        }

        public Criteria andLevel7RNotEqualTo(String value) {
            addCriterion("level7_r <>", value, "level7R");
            return (Criteria) this;
        }

        public Criteria andLevel7RGreaterThan(String value) {
            addCriterion("level7_r >", value, "level7R");
            return (Criteria) this;
        }

        public Criteria andLevel7RGreaterThanOrEqualTo(String value) {
            addCriterion("level7_r >=", value, "level7R");
            return (Criteria) this;
        }

        public Criteria andLevel7RLessThan(String value) {
            addCriterion("level7_r <", value, "level7R");
            return (Criteria) this;
        }

        public Criteria andLevel7RLessThanOrEqualTo(String value) {
            addCriterion("level7_r <=", value, "level7R");
            return (Criteria) this;
        }

        public Criteria andLevel7RLike(String value) {
            addCriterion("level7_r like", value, "level7R");
            return (Criteria) this;
        }

        public Criteria andLevel7RNotLike(String value) {
            addCriterion("level7_r not like", value, "level7R");
            return (Criteria) this;
        }

        public Criteria andLevel7RIn(List<String> values) {
            addCriterion("level7_r in", values, "level7R");
            return (Criteria) this;
        }

        public Criteria andLevel7RNotIn(List<String> values) {
            addCriterion("level7_r not in", values, "level7R");
            return (Criteria) this;
        }

        public Criteria andLevel7RBetween(String value1, String value2) {
            addCriterion("level7_r between", value1, value2, "level7R");
            return (Criteria) this;
        }

        public Criteria andLevel7RNotBetween(String value1, String value2) {
            addCriterion("level7_r not between", value1, value2, "level7R");
            return (Criteria) this;
        }

        public Criteria andLevel10RIsNull() {
            addCriterion("level10_r is null");
            return (Criteria) this;
        }

        public Criteria andLevel10RIsNotNull() {
            addCriterion("level10_r is not null");
            return (Criteria) this;
        }

        public Criteria andLevel10REqualTo(String value) {
            addCriterion("level10_r =", value, "level10R");
            return (Criteria) this;
        }

        public Criteria andLevel10RNotEqualTo(String value) {
            addCriterion("level10_r <>", value, "level10R");
            return (Criteria) this;
        }

        public Criteria andLevel10RGreaterThan(String value) {
            addCriterion("level10_r >", value, "level10R");
            return (Criteria) this;
        }

        public Criteria andLevel10RGreaterThanOrEqualTo(String value) {
            addCriterion("level10_r >=", value, "level10R");
            return (Criteria) this;
        }

        public Criteria andLevel10RLessThan(String value) {
            addCriterion("level10_r <", value, "level10R");
            return (Criteria) this;
        }

        public Criteria andLevel10RLessThanOrEqualTo(String value) {
            addCriterion("level10_r <=", value, "level10R");
            return (Criteria) this;
        }

        public Criteria andLevel10RLike(String value) {
            addCriterion("level10_r like", value, "level10R");
            return (Criteria) this;
        }

        public Criteria andLevel10RNotLike(String value) {
            addCriterion("level10_r not like", value, "level10R");
            return (Criteria) this;
        }

        public Criteria andLevel10RIn(List<String> values) {
            addCriterion("level10_r in", values, "level10R");
            return (Criteria) this;
        }

        public Criteria andLevel10RNotIn(List<String> values) {
            addCriterion("level10_r not in", values, "level10R");
            return (Criteria) this;
        }

        public Criteria andLevel10RBetween(String value1, String value2) {
            addCriterion("level10_r between", value1, value2, "level10R");
            return (Criteria) this;
        }

        public Criteria andLevel10RNotBetween(String value1, String value2) {
            addCriterion("level10_r not between", value1, value2, "level10R");
            return (Criteria) this;
        }

        public Criteria andLevel12RIsNull() {
            addCriterion("level12_r is null");
            return (Criteria) this;
        }

        public Criteria andLevel12RIsNotNull() {
            addCriterion("level12_r is not null");
            return (Criteria) this;
        }

        public Criteria andLevel12REqualTo(String value) {
            addCriterion("level12_r =", value, "level12R");
            return (Criteria) this;
        }

        public Criteria andLevel12RNotEqualTo(String value) {
            addCriterion("level12_r <>", value, "level12R");
            return (Criteria) this;
        }

        public Criteria andLevel12RGreaterThan(String value) {
            addCriterion("level12_r >", value, "level12R");
            return (Criteria) this;
        }

        public Criteria andLevel12RGreaterThanOrEqualTo(String value) {
            addCriterion("level12_r >=", value, "level12R");
            return (Criteria) this;
        }

        public Criteria andLevel12RLessThan(String value) {
            addCriterion("level12_r <", value, "level12R");
            return (Criteria) this;
        }

        public Criteria andLevel12RLessThanOrEqualTo(String value) {
            addCriterion("level12_r <=", value, "level12R");
            return (Criteria) this;
        }

        public Criteria andLevel12RLike(String value) {
            addCriterion("level12_r like", value, "level12R");
            return (Criteria) this;
        }

        public Criteria andLevel12RNotLike(String value) {
            addCriterion("level12_r not like", value, "level12R");
            return (Criteria) this;
        }

        public Criteria andLevel12RIn(List<String> values) {
            addCriterion("level12_r in", values, "level12R");
            return (Criteria) this;
        }

        public Criteria andLevel12RNotIn(List<String> values) {
            addCriterion("level12_r not in", values, "level12R");
            return (Criteria) this;
        }

        public Criteria andLevel12RBetween(String value1, String value2) {
            addCriterion("level12_r between", value1, value2, "level12R");
            return (Criteria) this;
        }

        public Criteria andLevel12RNotBetween(String value1, String value2) {
            addCriterion("level12_r not between", value1, value2, "level12R");
            return (Criteria) this;
        }

        public Criteria andDirectionIsNull() {
            addCriterion("direction is null");
            return (Criteria) this;
        }

        public Criteria andDirectionIsNotNull() {
            addCriterion("direction is not null");
            return (Criteria) this;
        }

        public Criteria andDirectionEqualTo(String value) {
            addCriterion("direction =", value, "direction");
            return (Criteria) this;
        }

        public Criteria andDirectionNotEqualTo(String value) {
            addCriterion("direction <>", value, "direction");
            return (Criteria) this;
        }

        public Criteria andDirectionGreaterThan(String value) {
            addCriterion("direction >", value, "direction");
            return (Criteria) this;
        }

        public Criteria andDirectionGreaterThanOrEqualTo(String value) {
            addCriterion("direction >=", value, "direction");
            return (Criteria) this;
        }

        public Criteria andDirectionLessThan(String value) {
            addCriterion("direction <", value, "direction");
            return (Criteria) this;
        }

        public Criteria andDirectionLessThanOrEqualTo(String value) {
            addCriterion("direction <=", value, "direction");
            return (Criteria) this;
        }

        public Criteria andDirectionLike(String value) {
            addCriterion("direction like", value, "direction");
            return (Criteria) this;
        }

        public Criteria andDirectionNotLike(String value) {
            addCriterion("direction not like", value, "direction");
            return (Criteria) this;
        }

        public Criteria andDirectionIn(List<String> values) {
            addCriterion("direction in", values, "direction");
            return (Criteria) this;
        }

        public Criteria andDirectionNotIn(List<String> values) {
            addCriterion("direction not in", values, "direction");
            return (Criteria) this;
        }

        public Criteria andDirectionBetween(String value1, String value2) {
            addCriterion("direction between", value1, value2, "direction");
            return (Criteria) this;
        }

        public Criteria andDirectionNotBetween(String value1, String value2) {
            addCriterion("direction not between", value1, value2, "direction");
            return (Criteria) this;
        }

        public Criteria andSpeedIsNull() {
            addCriterion("speed is null");
            return (Criteria) this;
        }

        public Criteria andSpeedIsNotNull() {
            addCriterion("speed is not null");
            return (Criteria) this;
        }

        public Criteria andSpeedEqualTo(String value) {
            addCriterion("speed =", value, "speed");
            return (Criteria) this;
        }

        public Criteria andSpeedNotEqualTo(String value) {
            addCriterion("speed <>", value, "speed");
            return (Criteria) this;
        }

        public Criteria andSpeedGreaterThan(String value) {
            addCriterion("speed >", value, "speed");
            return (Criteria) this;
        }

        public Criteria andSpeedGreaterThanOrEqualTo(String value) {
            addCriterion("speed >=", value, "speed");
            return (Criteria) this;
        }

        public Criteria andSpeedLessThan(String value) {
            addCriterion("speed <", value, "speed");
            return (Criteria) this;
        }

        public Criteria andSpeedLessThanOrEqualTo(String value) {
            addCriterion("speed <=", value, "speed");
            return (Criteria) this;
        }

        public Criteria andSpeedLike(String value) {
            addCriterion("speed like", value, "speed");
            return (Criteria) this;
        }

        public Criteria andSpeedNotLike(String value) {
            addCriterion("speed not like", value, "speed");
            return (Criteria) this;
        }

        public Criteria andSpeedIn(List<String> values) {
            addCriterion("speed in", values, "speed");
            return (Criteria) this;
        }

        public Criteria andSpeedNotIn(List<String> values) {
            addCriterion("speed not in", values, "speed");
            return (Criteria) this;
        }

        public Criteria andSpeedBetween(String value1, String value2) {
            addCriterion("speed between", value1, value2, "speed");
            return (Criteria) this;
        }

        public Criteria andSpeedNotBetween(String value1, String value2) {
            addCriterion("speed not between", value1, value2, "speed");
            return (Criteria) this;
        }

        public Criteria andTyphoonTypeIsNull() {
            addCriterion("typhoon_type is null");
            return (Criteria) this;
        }

        public Criteria andTyphoonTypeIsNotNull() {
            addCriterion("typhoon_type is not null");
            return (Criteria) this;
        }

        public Criteria andTyphoonTypeEqualTo(String value) {
            addCriterion("typhoon_type =", value, "typhoonType");
            return (Criteria) this;
        }

        public Criteria andTyphoonTypeNotEqualTo(String value) {
            addCriterion("typhoon_type <>", value, "typhoonType");
            return (Criteria) this;
        }

        public Criteria andTyphoonTypeGreaterThan(String value) {
            addCriterion("typhoon_type >", value, "typhoonType");
            return (Criteria) this;
        }

        public Criteria andTyphoonTypeGreaterThanOrEqualTo(String value) {
            addCriterion("typhoon_type >=", value, "typhoonType");
            return (Criteria) this;
        }

        public Criteria andTyphoonTypeLessThan(String value) {
            addCriterion("typhoon_type <", value, "typhoonType");
            return (Criteria) this;
        }

        public Criteria andTyphoonTypeLessThanOrEqualTo(String value) {
            addCriterion("typhoon_type <=", value, "typhoonType");
            return (Criteria) this;
        }

        public Criteria andTyphoonTypeLike(String value) {
            addCriterion("typhoon_type like", value, "typhoonType");
            return (Criteria) this;
        }

        public Criteria andTyphoonTypeNotLike(String value) {
            addCriterion("typhoon_type not like", value, "typhoonType");
            return (Criteria) this;
        }

        public Criteria andTyphoonTypeIn(List<String> values) {
            addCriterion("typhoon_type in", values, "typhoonType");
            return (Criteria) this;
        }

        public Criteria andTyphoonTypeNotIn(List<String> values) {
            addCriterion("typhoon_type not in", values, "typhoonType");
            return (Criteria) this;
        }

        public Criteria andTyphoonTypeBetween(String value1, String value2) {
            addCriterion("typhoon_type between", value1, value2, "typhoonType");
            return (Criteria) this;
        }

        public Criteria andTyphoonTypeNotBetween(String value1, String value2) {
            addCriterion("typhoon_type not between", value1, value2, "typhoonType");
            return (Criteria) this;
        }

        public Criteria andDataAreaIsNull() {
            addCriterion("data_area is null");
            return (Criteria) this;
        }

        public Criteria andDataAreaIsNotNull() {
            addCriterion("data_area is not null");
            return (Criteria) this;
        }

        public Criteria andDataAreaEqualTo(String value) {
            addCriterion("data_area =", value, "dataArea");
            return (Criteria) this;
        }

        public Criteria andDataAreaNotEqualTo(String value) {
            addCriterion("data_area <>", value, "dataArea");
            return (Criteria) this;
        }

        public Criteria andDataAreaGreaterThan(String value) {
            addCriterion("data_area >", value, "dataArea");
            return (Criteria) this;
        }

        public Criteria andDataAreaGreaterThanOrEqualTo(String value) {
            addCriterion("data_area >=", value, "dataArea");
            return (Criteria) this;
        }

        public Criteria andDataAreaLessThan(String value) {
            addCriterion("data_area <", value, "dataArea");
            return (Criteria) this;
        }

        public Criteria andDataAreaLessThanOrEqualTo(String value) {
            addCriterion("data_area <=", value, "dataArea");
            return (Criteria) this;
        }

        public Criteria andDataAreaLike(String value) {
            addCriterion("data_area like", value, "dataArea");
            return (Criteria) this;
        }

        public Criteria andDataAreaNotLike(String value) {
            addCriterion("data_area not like", value, "dataArea");
            return (Criteria) this;
        }

        public Criteria andDataAreaIn(List<String> values) {
            addCriterion("data_area in", values, "dataArea");
            return (Criteria) this;
        }

        public Criteria andDataAreaNotIn(List<String> values) {
            addCriterion("data_area not in", values, "dataArea");
            return (Criteria) this;
        }

        public Criteria andDataAreaBetween(String value1, String value2) {
            addCriterion("data_area between", value1, value2, "dataArea");
            return (Criteria) this;
        }

        public Criteria andDataAreaNotBetween(String value1, String value2) {
            addCriterion("data_area not between", value1, value2, "dataArea");
            return (Criteria) this;
        }

        public Criteria andNumInatiIsNull() {
            addCriterion("num_inati is null");
            return (Criteria) this;
        }

        public Criteria andNumInatiIsNotNull() {
            addCriterion("num_inati is not null");
            return (Criteria) this;
        }

        public Criteria andNumInatiEqualTo(String value) {
            addCriterion("num_inati =", value, "numInati");
            return (Criteria) this;
        }

        public Criteria andNumInatiNotEqualTo(String value) {
            addCriterion("num_inati <>", value, "numInati");
            return (Criteria) this;
        }

        public Criteria andNumInatiGreaterThan(String value) {
            addCriterion("num_inati >", value, "numInati");
            return (Criteria) this;
        }

        public Criteria andNumInatiGreaterThanOrEqualTo(String value) {
            addCriterion("num_inati >=", value, "numInati");
            return (Criteria) this;
        }

        public Criteria andNumInatiLessThan(String value) {
            addCriterion("num_inati <", value, "numInati");
            return (Criteria) this;
        }

        public Criteria andNumInatiLessThanOrEqualTo(String value) {
            addCriterion("num_inati <=", value, "numInati");
            return (Criteria) this;
        }

        public Criteria andNumInatiLike(String value) {
            addCriterion("num_inati like", value, "numInati");
            return (Criteria) this;
        }

        public Criteria andNumInatiNotLike(String value) {
            addCriterion("num_inati not like", value, "numInati");
            return (Criteria) this;
        }

        public Criteria andNumInatiIn(List<String> values) {
            addCriterion("num_inati in", values, "numInati");
            return (Criteria) this;
        }

        public Criteria andNumInatiNotIn(List<String> values) {
            addCriterion("num_inati not in", values, "numInati");
            return (Criteria) this;
        }

        public Criteria andNumInatiBetween(String value1, String value2) {
            addCriterion("num_inati between", value1, value2, "numInati");
            return (Criteria) this;
        }

        public Criteria andNumInatiNotBetween(String value1, String value2) {
            addCriterion("num_inati not between", value1, value2, "numInati");
            return (Criteria) this;
        }

        public Criteria andStartingtimeIsNull() {
            addCriterion("startingTime is null");
            return (Criteria) this;
        }

        public Criteria andStartingtimeIsNotNull() {
            addCriterion("startingTime is not null");
            return (Criteria) this;
        }

        public Criteria andStartingtimeEqualTo(String value) {
            addCriterion("startingTime =", value, "startingtime");
            return (Criteria) this;
        }

        public Criteria andStartingtimeNotEqualTo(String value) {
            addCriterion("startingTime <>", value, "startingtime");
            return (Criteria) this;
        }

        public Criteria andStartingtimeGreaterThan(String value) {
            addCriterion("startingTime >", value, "startingtime");
            return (Criteria) this;
        }

        public Criteria andStartingtimeGreaterThanOrEqualTo(String value) {
            addCriterion("startingTime >=", value, "startingtime");
            return (Criteria) this;
        }

        public Criteria andStartingtimeLessThan(String value) {
            addCriterion("startingTime <", value, "startingtime");
            return (Criteria) this;
        }

        public Criteria andStartingtimeLessThanOrEqualTo(String value) {
            addCriterion("startingTime <=", value, "startingtime");
            return (Criteria) this;
        }

        public Criteria andStartingtimeLike(String value) {
            addCriterion("startingTime like", value, "startingtime");
            return (Criteria) this;
        }

        public Criteria andStartingtimeNotLike(String value) {
            addCriterion("startingTime not like", value, "startingtime");
            return (Criteria) this;
        }

        public Criteria andStartingtimeIn(List<String> values) {
            addCriterion("startingTime in", values, "startingtime");
            return (Criteria) this;
        }

        public Criteria andStartingtimeNotIn(List<String> values) {
            addCriterion("startingTime not in", values, "startingtime");
            return (Criteria) this;
        }

        public Criteria andStartingtimeBetween(String value1, String value2) {
            addCriterion("startingTime between", value1, value2, "startingtime");
            return (Criteria) this;
        }

        public Criteria andStartingtimeNotBetween(String value1, String value2) {
            addCriterion("startingTime not between", value1, value2, "startingtime");
            return (Criteria) this;
        }
    }

    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}