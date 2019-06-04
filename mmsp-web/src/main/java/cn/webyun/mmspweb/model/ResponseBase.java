package cn.webyun.mmspweb.model;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseBase {
    private Boolean success ;
    private String msg ;
    private Object data;
    public ResponseBase() {
    }
    public ResponseBase(Boolean success) {
        this.success = success;
    }

    public ResponseBase(Boolean success, String msg) {
        this.success = success;
        this.msg = msg;
    }

    public ResponseBase(Boolean success, String msg, Object data) {
        this.success=success;
        this.msg=msg;
        this.data=data;
    }



    public ResponseBase(Object data) {
        this.data=data;
    }

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }


}
