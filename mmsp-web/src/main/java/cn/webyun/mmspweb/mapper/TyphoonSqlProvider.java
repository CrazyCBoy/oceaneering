package cn.webyun.mmspweb.mapper;

import cn.webyun.mmspweb.entity.sys.Typhoon;
import cn.webyun.mmspweb.entity.sys.TyphoonCriteria.Criteria;
import cn.webyun.mmspweb.entity.sys.TyphoonCriteria.Criterion;
import cn.webyun.mmspweb.entity.sys.TyphoonCriteria;
import java.util.List;
import java.util.Map;
import org.apache.ibatis.jdbc.SQL;

public class TyphoonSqlProvider {

    public String countByExample(TyphoonCriteria example) {
        SQL sql = new SQL();
        sql.SELECT("count(*)").FROM("typhoon_info");
        applyWhere(sql, example, false);
        return sql.toString();
    }

    public String deleteByExample(TyphoonCriteria example) {
        SQL sql = new SQL();
        sql.DELETE_FROM("typhoon_info");
        applyWhere(sql, example, false);
        return sql.toString();
    }

    public String insertSelective(Typhoon record) {
        SQL sql = new SQL();
        sql.INSERT_INTO("typhoon_info");
        
        if (record.getTyphoonCode() != null) {
            sql.VALUES("typhoon_code", "#{typhoonCode,jdbcType=VARCHAR}");
        }
        
        if (record.getTyphoonName() != null) {
            sql.VALUES("typhoon_name", "#{typhoonName,jdbcType=VARCHAR}");
        }
        
        if (record.getDataDate() != null) {
            sql.VALUES("data_date", "#{dataDate,jdbcType=VARCHAR}");
        }
        
        if (record.getDateLimit() != null) {
            sql.VALUES("date_limit", "#{dateLimit,jdbcType=VARCHAR}");
        }
        
        if (record.getLon() != null) {
            sql.VALUES("lon", "#{lon,jdbcType=VARCHAR}");
        }
        
        if (record.getLat() != null) {
            sql.VALUES("lat", "#{lat,jdbcType=VARCHAR}");
        }
        
        if (record.getAirPressure() != null) {
            sql.VALUES("air_pressure", "#{airPressure,jdbcType=VARCHAR}");
        }
        
        if (record.getWindSpeed() != null) {
            sql.VALUES("wind_speed", "#{windSpeed,jdbcType=VARCHAR}");
        }
        
        if (record.getLevel7R() != null) {
            sql.VALUES("level7_r", "#{level7R,jdbcType=VARCHAR}");
        }
        
        if (record.getLevel10R() != null) {
            sql.VALUES("level10_r", "#{level10R,jdbcType=VARCHAR}");
        }
        
        if (record.getLevel12R() != null) {
            sql.VALUES("level12_r", "#{level12R,jdbcType=VARCHAR}");
        }
        
        if (record.getDirection() != null) {
            sql.VALUES("direction", "#{direction,jdbcType=VARCHAR}");
        }
        
        if (record.getSpeed() != null) {
            sql.VALUES("speed", "#{speed,jdbcType=VARCHAR}");
        }
        
        if (record.getTyphoonType() != null) {
            sql.VALUES("typhoon_type", "#{typhoonType,jdbcType=VARCHAR}");
        }
        
        if (record.getDataArea() != null) {
            sql.VALUES("data_area", "#{dataArea,jdbcType=VARCHAR}");
        }
        
        if (record.getNumInati() != null) {
            sql.VALUES("num_inati", "#{numInati,jdbcType=VARCHAR}");
        }
        
        if (record.getStartingtime() != null) {
            sql.VALUES("startingTime", "#{startingtime,jdbcType=VARCHAR}");
        }
        
        return sql.toString();
    }

    public String selectByExample(TyphoonCriteria example) {
        SQL sql = new SQL();
        if (example != null && example.isDistinct()) {
            sql.SELECT_DISTINCT("id");
        } else {
            sql.SELECT("id");
        }
        sql.SELECT("typhoon_code");
        sql.SELECT("typhoon_name");
        sql.SELECT("data_date");
        sql.SELECT("date_limit");
        sql.SELECT("lon");
        sql.SELECT("lat");
        sql.SELECT("air_pressure");
        sql.SELECT("wind_speed");
        sql.SELECT("level7_r");
        sql.SELECT("level10_r");
        sql.SELECT("level12_r");
        sql.SELECT("direction");
        sql.SELECT("speed");
        sql.SELECT("typhoon_type");
        sql.SELECT("data_area");
        sql.SELECT("num_inati");
        sql.SELECT("startingTime");
        sql.FROM("typhoon_info");
        applyWhere(sql, example, false);
        
        if (example != null && example.getOrderByClause() != null) {
            sql.ORDER_BY(example.getOrderByClause());
        }
        
        return sql.toString();
    }

    public String updateByExampleSelective(Map<String, Object> parameter) {
        Typhoon record = (Typhoon) parameter.get("record");
        TyphoonCriteria example = (TyphoonCriteria) parameter.get("example");
        
        SQL sql = new SQL();
        sql.UPDATE("typhoon_info");
        
        if (record.getId() != null) {
            sql.SET("id = #{record.id,jdbcType=INTEGER}");
        }
        
        if (record.getTyphoonCode() != null) {
            sql.SET("typhoon_code = #{record.typhoonCode,jdbcType=VARCHAR}");
        }
        
        if (record.getTyphoonName() != null) {
            sql.SET("typhoon_name = #{record.typhoonName,jdbcType=VARCHAR}");
        }
        
        if (record.getDataDate() != null) {
            sql.SET("data_date = #{record.dataDate,jdbcType=VARCHAR}");
        }
        
        if (record.getDateLimit() != null) {
            sql.SET("date_limit = #{record.dateLimit,jdbcType=VARCHAR}");
        }
        
        if (record.getLon() != null) {
            sql.SET("lon = #{record.lon,jdbcType=VARCHAR}");
        }
        
        if (record.getLat() != null) {
            sql.SET("lat = #{record.lat,jdbcType=VARCHAR}");
        }
        
        if (record.getAirPressure() != null) {
            sql.SET("air_pressure = #{record.airPressure,jdbcType=VARCHAR}");
        }
        
        if (record.getWindSpeed() != null) {
            sql.SET("wind_speed = #{record.windSpeed,jdbcType=VARCHAR}");
        }
        
        if (record.getLevel7R() != null) {
            sql.SET("level7_r = #{record.level7R,jdbcType=VARCHAR}");
        }
        
        if (record.getLevel10R() != null) {
            sql.SET("level10_r = #{record.level10R,jdbcType=VARCHAR}");
        }
        
        if (record.getLevel12R() != null) {
            sql.SET("level12_r = #{record.level12R,jdbcType=VARCHAR}");
        }
        
        if (record.getDirection() != null) {
            sql.SET("direction = #{record.direction,jdbcType=VARCHAR}");
        }
        
        if (record.getSpeed() != null) {
            sql.SET("speed = #{record.speed,jdbcType=VARCHAR}");
        }
        
        if (record.getTyphoonType() != null) {
            sql.SET("typhoon_type = #{record.typhoonType,jdbcType=VARCHAR}");
        }
        
        if (record.getDataArea() != null) {
            sql.SET("data_area = #{record.dataArea,jdbcType=VARCHAR}");
        }
        
        if (record.getNumInati() != null) {
            sql.SET("num_inati = #{record.numInati,jdbcType=VARCHAR}");
        }
        
        if (record.getStartingtime() != null) {
            sql.SET("startingTime = #{record.startingtime,jdbcType=VARCHAR}");
        }
        
        applyWhere(sql, example, true);
        return sql.toString();
    }

    public String updateByExample(Map<String, Object> parameter) {
        SQL sql = new SQL();
        sql.UPDATE("typhoon_info");
        
        sql.SET("id = #{record.id,jdbcType=INTEGER}");
        sql.SET("typhoon_code = #{record.typhoonCode,jdbcType=VARCHAR}");
        sql.SET("typhoon_name = #{record.typhoonName,jdbcType=VARCHAR}");
        sql.SET("data_date = #{record.dataDate,jdbcType=VARCHAR}");
        sql.SET("date_limit = #{record.dateLimit,jdbcType=VARCHAR}");
        sql.SET("lon = #{record.lon,jdbcType=VARCHAR}");
        sql.SET("lat = #{record.lat,jdbcType=VARCHAR}");
        sql.SET("air_pressure = #{record.airPressure,jdbcType=VARCHAR}");
        sql.SET("wind_speed = #{record.windSpeed,jdbcType=VARCHAR}");
        sql.SET("level7_r = #{record.level7R,jdbcType=VARCHAR}");
        sql.SET("level10_r = #{record.level10R,jdbcType=VARCHAR}");
        sql.SET("level12_r = #{record.level12R,jdbcType=VARCHAR}");
        sql.SET("direction = #{record.direction,jdbcType=VARCHAR}");
        sql.SET("speed = #{record.speed,jdbcType=VARCHAR}");
        sql.SET("typhoon_type = #{record.typhoonType,jdbcType=VARCHAR}");
        sql.SET("data_area = #{record.dataArea,jdbcType=VARCHAR}");
        sql.SET("num_inati = #{record.numInati,jdbcType=VARCHAR}");
        sql.SET("startingTime = #{record.startingtime,jdbcType=VARCHAR}");
        
        TyphoonCriteria example = (TyphoonCriteria) parameter.get("example");
        applyWhere(sql, example, true);
        return sql.toString();
    }

    public String updateByPrimaryKeySelective(Typhoon record) {
        SQL sql = new SQL();
        sql.UPDATE("typhoon_info");
        
        if (record.getTyphoonCode() != null) {
            sql.SET("typhoon_code = #{typhoonCode,jdbcType=VARCHAR}");
        }
        
        if (record.getTyphoonName() != null) {
            sql.SET("typhoon_name = #{typhoonName,jdbcType=VARCHAR}");
        }
        
        if (record.getDataDate() != null) {
            sql.SET("data_date = #{dataDate,jdbcType=VARCHAR}");
        }
        
        if (record.getDateLimit() != null) {
            sql.SET("date_limit = #{dateLimit,jdbcType=VARCHAR}");
        }
        
        if (record.getLon() != null) {
            sql.SET("lon = #{lon,jdbcType=VARCHAR}");
        }
        
        if (record.getLat() != null) {
            sql.SET("lat = #{lat,jdbcType=VARCHAR}");
        }
        
        if (record.getAirPressure() != null) {
            sql.SET("air_pressure = #{airPressure,jdbcType=VARCHAR}");
        }
        
        if (record.getWindSpeed() != null) {
            sql.SET("wind_speed = #{windSpeed,jdbcType=VARCHAR}");
        }
        
        if (record.getLevel7R() != null) {
            sql.SET("level7_r = #{level7R,jdbcType=VARCHAR}");
        }
        
        if (record.getLevel10R() != null) {
            sql.SET("level10_r = #{level10R,jdbcType=VARCHAR}");
        }
        
        if (record.getLevel12R() != null) {
            sql.SET("level12_r = #{level12R,jdbcType=VARCHAR}");
        }
        
        if (record.getDirection() != null) {
            sql.SET("direction = #{direction,jdbcType=VARCHAR}");
        }
        
        if (record.getSpeed() != null) {
            sql.SET("speed = #{speed,jdbcType=VARCHAR}");
        }
        
        if (record.getTyphoonType() != null) {
            sql.SET("typhoon_type = #{typhoonType,jdbcType=VARCHAR}");
        }
        
        if (record.getDataArea() != null) {
            sql.SET("data_area = #{dataArea,jdbcType=VARCHAR}");
        }
        
        if (record.getNumInati() != null) {
            sql.SET("num_inati = #{numInati,jdbcType=VARCHAR}");
        }
        
        if (record.getStartingtime() != null) {
            sql.SET("startingTime = #{startingtime,jdbcType=VARCHAR}");
        }
        
        sql.WHERE("id = #{id,jdbcType=INTEGER}");
        
        return sql.toString();
    }

    protected void applyWhere(SQL sql, TyphoonCriteria example, boolean includeExamplePhrase) {
        if (example == null) {
            return;
        }
        
        String parmPhrase1;
        String parmPhrase1_th;
        String parmPhrase2;
        String parmPhrase2_th;
        String parmPhrase3;
        String parmPhrase3_th;
        if (includeExamplePhrase) {
            parmPhrase1 = "%s #{example.oredCriteria[%d].allCriteria[%d].value}";
            parmPhrase1_th = "%s #{example.oredCriteria[%d].allCriteria[%d].value,typeHandler=%s}";
            parmPhrase2 = "%s #{example.oredCriteria[%d].allCriteria[%d].value} and #{example.oredCriteria[%d].criteria[%d].secondValue}";
            parmPhrase2_th = "%s #{example.oredCriteria[%d].allCriteria[%d].value,typeHandler=%s} and #{example.oredCriteria[%d].criteria[%d].secondValue,typeHandler=%s}";
            parmPhrase3 = "#{example.oredCriteria[%d].allCriteria[%d].value[%d]}";
            parmPhrase3_th = "#{example.oredCriteria[%d].allCriteria[%d].value[%d],typeHandler=%s}";
        } else {
            parmPhrase1 = "%s #{oredCriteria[%d].allCriteria[%d].value}";
            parmPhrase1_th = "%s #{oredCriteria[%d].allCriteria[%d].value,typeHandler=%s}";
            parmPhrase2 = "%s #{oredCriteria[%d].allCriteria[%d].value} and #{oredCriteria[%d].criteria[%d].secondValue}";
            parmPhrase2_th = "%s #{oredCriteria[%d].allCriteria[%d].value,typeHandler=%s} and #{oredCriteria[%d].criteria[%d].secondValue,typeHandler=%s}";
            parmPhrase3 = "#{oredCriteria[%d].allCriteria[%d].value[%d]}";
            parmPhrase3_th = "#{oredCriteria[%d].allCriteria[%d].value[%d],typeHandler=%s}";
        }
        
        StringBuilder sb = new StringBuilder();
        List<Criteria> oredCriteria = example.getOredCriteria();
        boolean firstCriteria = true;
        for (int i = 0; i < oredCriteria.size(); i++) {
            Criteria criteria = oredCriteria.get(i);
            if (criteria.isValid()) {
                if (firstCriteria) {
                    firstCriteria = false;
                } else {
                    sb.append(" or ");
                }
                
                sb.append('(');
                List<Criterion> criterions = criteria.getAllCriteria();
                boolean firstCriterion = true;
                for (int j = 0; j < criterions.size(); j++) {
                    Criterion criterion = criterions.get(j);
                    if (firstCriterion) {
                        firstCriterion = false;
                    } else {
                        sb.append(" and ");
                    }
                    
                    if (criterion.isNoValue()) {
                        sb.append(criterion.getCondition());
                    } else if (criterion.isSingleValue()) {
                        if (criterion.getTypeHandler() == null) {
                            sb.append(String.format(parmPhrase1, criterion.getCondition(), i, j));
                        } else {
                            sb.append(String.format(parmPhrase1_th, criterion.getCondition(), i, j,criterion.getTypeHandler()));
                        }
                    } else if (criterion.isBetweenValue()) {
                        if (criterion.getTypeHandler() == null) {
                            sb.append(String.format(parmPhrase2, criterion.getCondition(), i, j, i, j));
                        } else {
                            sb.append(String.format(parmPhrase2_th, criterion.getCondition(), i, j, criterion.getTypeHandler(), i, j, criterion.getTypeHandler()));
                        }
                    } else if (criterion.isListValue()) {
                        sb.append(criterion.getCondition());
                        sb.append(" (");
                        List<?> listItems = (List<?>) criterion.getValue();
                        boolean comma = false;
                        for (int k = 0; k < listItems.size(); k++) {
                            if (comma) {
                                sb.append(", ");
                            } else {
                                comma = true;
                            }
                            if (criterion.getTypeHandler() == null) {
                                sb.append(String.format(parmPhrase3, i, j, k));
                            } else {
                                sb.append(String.format(parmPhrase3_th, i, j, k, criterion.getTypeHandler()));
                            }
                        }
                        sb.append(')');
                    }
                }
                sb.append(')');
            }
        }
        
        if (sb.length() > 0) {
            sql.WHERE(sb.toString());
        }
    }
}