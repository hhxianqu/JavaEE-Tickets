package edu.nju.tickets.dao;

import edu.nju.tickets.entity.OrderForm;
import edu.nju.tickets.entity.ProjectPrice;

import java.util.List;

public interface OrderFormDao extends BaseDao<OrderForm, Integer> {

    List<OrderForm> findByUserIdOrderByCreateTimeDesc(Integer userId);

    List<OrderForm> findByUserIdAndStateOrderByCreateTimeDesc(Integer userId, int state);

    List<OrderForm> findByState(int state);

    List<OrderForm> findByProjectPrice(ProjectPrice projectPrice);
}
