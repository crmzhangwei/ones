<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ReturnsViewModel
 *
 * @author 志鹏
 */
class ReturnsViewModel extends CommonViewModel {
    
    protected $workflowAlias = "returns";
    
    protected $viewFields = array(
        "Returns" => array("id","bill_code","subject","returns_type","saler_id","customer_id","total_num","stock_id","dateline","status","memo"),
    );
    
    /**
     * 订单状态
     * 0: 刚创建，未提交   新订单
     * 1: 已保存，未提交审核   已保存
     * 2: 已提交给财务审核，订单不能在修改  待财务审核
     * 3: 财务已审核，等待销售请求出库   财务已审核
     * 4: 销售生成出库单，请求出库，    待库管确认出库
     * 5: 库管确认出库，等待发货       已出库，待发货
     * 6: 库管发货，订单结束          已发货
     * 7: 订单完成                  已完成
     */
    protected $status_lang = array(
        "new_returns_paper", 
        "processed_and_uneditable",
    );
    
    protected $status_class = array(
        "info", "normal"
    );
    
}

?>
