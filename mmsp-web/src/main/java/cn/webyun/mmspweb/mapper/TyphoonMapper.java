package cn.webyun.mmspweb.mapper;

import cn.webyun.mmspweb.entity.sys.Typhoon;
import cn.webyun.mmspweb.entity.sys.TyphoonCriteria;
import java.util.List;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.DeleteProvider;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.InsertProvider;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.annotations.Update;
import org.apache.ibatis.annotations.UpdateProvider;
import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.type.JdbcType;
import org.mybatis.spring.annotation.MapperScan;


public interface TyphoonMapper {
    @SelectProvider(type=TyphoonSqlProvider.class, method="countByExample")
    long countByExample(TyphoonCriteria example);

    @DeleteProvider(type=TyphoonSqlProvider.class, method="deleteByExample")
    int deleteByExample(TyphoonCriteria example);

    @Delete({
        "delete from typhoon_info",
        "where id = #{id,jdbcType=INTEGER}"
    })
    int deleteByPrimaryKey(Integer id);

    @Insert({
        "insert into typhoon_info (typhoon_code, typhoon_name, ",
        "data_date, date_limit, ",
        "lon, lat, air_pressure, ",
        "wind_speed, level7_r, ",
        "level10_r, level12_r, ",
        "direction, speed, ",
        "typhoon_type, data_area, ",
        "num_inati, startingTime)",
        "values (#{typhoonCode,jdbcType=VARCHAR}, #{typhoonName,jdbcType=VARCHAR}, ",
        "#{dataDate,jdbcType=VARCHAR}, #{dateLimit,jdbcType=VARCHAR}, ",
        "#{lon,jdbcType=VARCHAR}, #{lat,jdbcType=VARCHAR}, #{airPressure,jdbcType=VARCHAR}, ",
        "#{windSpeed,jdbcType=VARCHAR}, #{level7R,jdbcType=VARCHAR}, ",
        "#{level10R,jdbcType=VARCHAR}, #{level12R,jdbcType=VARCHAR}, ",
        "#{direction,jdbcType=VARCHAR}, #{speed,jdbcType=VARCHAR}, ",
        "#{typhoonType,jdbcType=VARCHAR}, #{dataArea,jdbcType=VARCHAR}, ",
        "#{numInati,jdbcType=VARCHAR}, #{startingtime,jdbcType=VARCHAR})"
    })
    @Options(useGeneratedKeys=true,keyProperty="id")
    int insert(Typhoon record);

    @InsertProvider(type=TyphoonSqlProvider.class, method="insertSelective")
    @Options(useGeneratedKeys=true,keyProperty="id")
    int insertSelective(Typhoon record);

    @SelectProvider(type=TyphoonSqlProvider.class, method="selectByExample")
    @Results({
        @Result(column="id", property="id", jdbcType=JdbcType.INTEGER, id=true),
        @Result(column="typhoon_code", property="typhoonCode", jdbcType=JdbcType.VARCHAR),
        @Result(column="typhoon_name", property="typhoonName", jdbcType=JdbcType.VARCHAR),
        @Result(column="data_date", property="dataDate", jdbcType=JdbcType.VARCHAR),
        @Result(column="date_limit", property="dateLimit", jdbcType=JdbcType.VARCHAR),
        @Result(column="lon", property="lon", jdbcType=JdbcType.VARCHAR),
        @Result(column="lat", property="lat", jdbcType=JdbcType.VARCHAR),
        @Result(column="air_pressure", property="airPressure", jdbcType=JdbcType.VARCHAR),
        @Result(column="wind_speed", property="windSpeed", jdbcType=JdbcType.VARCHAR),
        @Result(column="level7_r", property="level7R", jdbcType=JdbcType.VARCHAR),
        @Result(column="level10_r", property="level10R", jdbcType=JdbcType.VARCHAR),
        @Result(column="level12_r", property="level12R", jdbcType=JdbcType.VARCHAR),
        @Result(column="direction", property="direction", jdbcType=JdbcType.VARCHAR),
        @Result(column="speed", property="speed", jdbcType=JdbcType.VARCHAR),
        @Result(column="typhoon_type", property="typhoonType", jdbcType=JdbcType.VARCHAR),
        @Result(column="data_area", property="dataArea", jdbcType=JdbcType.VARCHAR),
        @Result(column="num_inati", property="numInati", jdbcType=JdbcType.VARCHAR),
        @Result(column="startingTime", property="startingtime", jdbcType=JdbcType.VARCHAR)
    })
    List<Typhoon> selectByExampleWithRowbounds(TyphoonCriteria example, RowBounds rowBounds);

    @SelectProvider(type=TyphoonSqlProvider.class, method="selectByExample")
    @Results({
        @Result(column="id", property="id", jdbcType=JdbcType.INTEGER, id=true),
        @Result(column="typhoon_code", property="typhoonCode", jdbcType=JdbcType.VARCHAR),
        @Result(column="typhoon_name", property="typhoonName", jdbcType=JdbcType.VARCHAR),
        @Result(column="data_date", property="dataDate", jdbcType=JdbcType.VARCHAR),
        @Result(column="date_limit", property="dateLimit", jdbcType=JdbcType.VARCHAR),
        @Result(column="lon", property="lon", jdbcType=JdbcType.VARCHAR),
        @Result(column="lat", property="lat", jdbcType=JdbcType.VARCHAR),
        @Result(column="air_pressure", property="airPressure", jdbcType=JdbcType.VARCHAR),
        @Result(column="wind_speed", property="windSpeed", jdbcType=JdbcType.VARCHAR),
        @Result(column="level7_r", property="level7R", jdbcType=JdbcType.VARCHAR),
        @Result(column="level10_r", property="level10R", jdbcType=JdbcType.VARCHAR),
        @Result(column="level12_r", property="level12R", jdbcType=JdbcType.VARCHAR),
        @Result(column="direction", property="direction", jdbcType=JdbcType.VARCHAR),
        @Result(column="speed", property="speed", jdbcType=JdbcType.VARCHAR),
        @Result(column="typhoon_type", property="typhoonType", jdbcType=JdbcType.VARCHAR),
        @Result(column="data_area", property="dataArea", jdbcType=JdbcType.VARCHAR),
        @Result(column="num_inati", property="numInati", jdbcType=JdbcType.VARCHAR),
        @Result(column="startingTime", property="startingtime", jdbcType=JdbcType.VARCHAR)
    })
    List<Typhoon> selectByExample(TyphoonCriteria example);

    @Select({
        "select",
        "id, typhoon_code, typhoon_name, data_date, date_limit, lon, lat, air_pressure, ",
        "wind_speed, level7_r, level10_r, level12_r, direction, speed, typhoon_type, ",
        "data_area, num_inati, startingTime",
        "from typhoon_info",
        "where id = #{id,jdbcType=INTEGER}"
    })
    @Results({
        @Result(column="id", property="id", jdbcType=JdbcType.INTEGER, id=true),
        @Result(column="typhoon_code", property="typhoonCode", jdbcType=JdbcType.VARCHAR),
        @Result(column="typhoon_name", property="typhoonName", jdbcType=JdbcType.VARCHAR),
        @Result(column="data_date", property="dataDate", jdbcType=JdbcType.VARCHAR),
        @Result(column="date_limit", property="dateLimit", jdbcType=JdbcType.VARCHAR),
        @Result(column="lon", property="lon", jdbcType=JdbcType.VARCHAR),
        @Result(column="lat", property="lat", jdbcType=JdbcType.VARCHAR),
        @Result(column="air_pressure", property="airPressure", jdbcType=JdbcType.VARCHAR),
        @Result(column="wind_speed", property="windSpeed", jdbcType=JdbcType.VARCHAR),
        @Result(column="level7_r", property="level7R", jdbcType=JdbcType.VARCHAR),
        @Result(column="level10_r", property="level10R", jdbcType=JdbcType.VARCHAR),
        @Result(column="level12_r", property="level12R", jdbcType=JdbcType.VARCHAR),
        @Result(column="direction", property="direction", jdbcType=JdbcType.VARCHAR),
        @Result(column="speed", property="speed", jdbcType=JdbcType.VARCHAR),
        @Result(column="typhoon_type", property="typhoonType", jdbcType=JdbcType.VARCHAR),
        @Result(column="data_area", property="dataArea", jdbcType=JdbcType.VARCHAR),
        @Result(column="num_inati", property="numInati", jdbcType=JdbcType.VARCHAR),
        @Result(column="startingTime", property="startingtime", jdbcType=JdbcType.VARCHAR)
    })
    Typhoon selectByPrimaryKey(Integer id);

    @UpdateProvider(type=TyphoonSqlProvider.class, method="updateByExampleSelective")
    int updateByExampleSelective(@Param("record") Typhoon record, @Param("example") TyphoonCriteria example);

    @UpdateProvider(type=TyphoonSqlProvider.class, method="updateByExample")
    int updateByExample(@Param("record") Typhoon record, @Param("example") TyphoonCriteria example);

    @UpdateProvider(type=TyphoonSqlProvider.class, method="updateByPrimaryKeySelective")
    int updateByPrimaryKeySelective(Typhoon record);

    @Update({
        "update typhoon_info",
        "set typhoon_code = #{typhoonCode,jdbcType=VARCHAR},",
          "typhoon_name = #{typhoonName,jdbcType=VARCHAR},",
          "data_date = #{dataDate,jdbcType=VARCHAR},",
          "date_limit = #{dateLimit,jdbcType=VARCHAR},",
          "lon = #{lon,jdbcType=VARCHAR},",
          "lat = #{lat,jdbcType=VARCHAR},",
          "air_pressure = #{airPressure,jdbcType=VARCHAR},",
          "wind_speed = #{windSpeed,jdbcType=VARCHAR},",
          "level7_r = #{level7R,jdbcType=VARCHAR},",
          "level10_r = #{level10R,jdbcType=VARCHAR},",
          "level12_r = #{level12R,jdbcType=VARCHAR},",
          "direction = #{direction,jdbcType=VARCHAR},",
          "speed = #{speed,jdbcType=VARCHAR},",
          "typhoon_type = #{typhoonType,jdbcType=VARCHAR},",
          "data_area = #{dataArea,jdbcType=VARCHAR},",
          "num_inati = #{numInati,jdbcType=VARCHAR},",
          "startingTime = #{startingtime,jdbcType=VARCHAR}",
        "where id = #{id,jdbcType=INTEGER}"
    })
    int updateByPrimaryKey(Typhoon record);
}