'use strict';

$().ready(function () {
    checkIdentity();
    let projectId = getQueryVariable('project_id');
    if (projectId === null) {
        alert('请输入正确的url');
        window.history.back();
    }
    showProjectDetail(projectId);
});

function showProjectDetail(projectId) {
    $.ajax({
        type: 'GET',
        url: '/api/projects/id/' + projectId,
        data: {},
        success: function (result) {
            if (result.success) {
                addProjectInfo(result.data);
            } else {
                alert(result.message);
                window.history.back();
            }
        },
        error: function (xhr, status, error) {
            alert('活动信息获取失败');
            window.history.back();
        }
    });
}

function addProjectInfo(project) {
    $('#project_name').text(project.name);
    $('#project_location').text(project.venueInfoVO.name + ' ' + project.venueInfoVO.location);
    $('#project_description').text(project.description);

    $('#project_begin_time').text(project.beginTime);
    $('#project_end_time').text(project.endTime);
    $('#project_type').text(project.type);
    $('#project_total_people').text(project.totalPeople);

    // 座位价格信息及下单选项
    let seatPriceList = $('#seat_price_list');
    seatPriceList.empty();
    for (let i = 0; i < project.prices.length; i++) {
        let item = project.prices[i];
        let identity = checkIdentity();
        if (identity === 'venue') {
            seatPriceList.append(`
            <div class="col-lg-3">
                <span>座位类型 : </span>
                <label>${item.seatName}</label>
            </div>
            <div class="col-lg-3">
                <span>座位数 : </span>
                <label>${item.seatNumber}人</label>
            </div>
            <div class="col-lg-3">
                <span>价格 : </span>
                <label>${item.price}</label>
            </div>
            <div class="col-lg-3">
                <button id="make_order_btn_${item.id}" class="btn btn-info online" 
                        onclick="judgeOfflinePurchase(${project.id}, ${item.id})">
                        线下购买
                </button>
            </div>
        `);
        } else {
            seatPriceList.append(`
            <div class="col-lg-3">
                <span>座位类型 : </span>
                <label>${item.seatName}</label>
            </div>
            <div class="col-lg-3">
                <span>座位数 : </span>
                <label>${item.seatNumber}人</label>
            </div>
            <div class="col-lg-3">
                <span>价格 : </span>
                <label>${item.price}</label>
            </div>
            <div class="col-lg-3">
                <button id="make_order_btn_${item.id}" class="btn btn-info online" 
                        onclick="judgeChoosePurchase(${project.id}, ${item.id})">
                        选座购买
                </button>
                <button id="offline_order_btn_${item.id}" class="btn btn-info underline"
                        onclick="judgeImmediatePurchase(${project.id}, ${item.id})">
                        立即购买
                </button>
            </div>
            `);

        }

    }
}


function judgeOfflinePurchase(projectId, itemId) {
    window.location.href = "/order/make-offline?project_id=" + projectId + "&project_price_id=" + itemId;
}

// 立即购买
function judgeImmediatePurchase(projectId, itemId) {
    let identity = checkIdentity();
    if (identity === 'visitor') {
        showSignInDialog();
        return;
    }
    if (identity === 'user') {
        window.location.href = "/order/make?project_id=" + projectId + "&project_price_id=" + itemId + "&type=immediate";
    }
}

// 选座购买
function judgeChoosePurchase(projectId, itemId) {
    let identity = checkIdentity();
    if (identity === 'visitor') {
        showSignInDialog();
        return;
    }
    if (identity === 'user') {
        window.location.href = "/order/make?project_id=" + projectId + "&project_price_id=" + itemId + "&type=choose";
    }
}