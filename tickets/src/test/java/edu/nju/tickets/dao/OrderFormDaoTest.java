package edu.nju.tickets.dao;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@ContextConfiguration({"file:web/WEB-INF/applicationContext.xml"})
public class OrderFormDaoTest {

    @Autowired
    public OrderFormDao orderFormDao;

    @Autowired
    public ProjectDao projectDao;

    @Autowired
    public UserDao userDao;

    @Test
    public void testSave() {
//        Project project = projectDao.get(11);
//        ProjectPrice projectPrice = project.getPriceList().get(0);
//        User user = userDao.get(2);
//
//        int seatNumber = 1;
//        int discount = 100;
//
//        OrderForm orderForm = new OrderForm();
//        orderForm.setPurchaseType(Constants.PurchaseType.CHOOSE_SEAT_PURCHASE);
//        orderForm.setProjectPrice(projectPrice);
//        orderForm.setSeatNumber(seatNumber);
//        orderForm.setState(Constants.OrderFormState.NOT_PAYED);
//        orderForm.setUser(user);
//        orderForm.setDiscount(discount);
//        orderForm.setTotalPrice(projectPrice.getPrice() * seatNumber * discount);
//
//        orderFormDao.save(orderForm);
    }
}
