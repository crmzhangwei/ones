'use strict';

angular.module("erp.passport.services", [])
        .factory("UserModel", ["DepartmentRes", "AuthGroupRes", "$q", "$rootScope", 
            function(DepartmentRes, AuthGroupRes, $q, $rootScope){
            
                var service = {
                    getFieldsStruct: function(structOnly) {

                        var fieldsStruct = {
                            id: {
                                primary: true
                            },
                            email: {
                                inputType: "email"
                            },
                            username: {},
                            password: {
                                inputType: "password",
                                listable: false,
                                required: false
                            },
                            truename: {},
                            phone: {
                                inputType: "number"
                            },
                            group_name: {
                                displayName: $rootScope.i18n.lang.usergroup,
                                field: "usergroup",
                                hideInForm: true
                            },
                            usergroup: {
                                inputType: "select2",
                                multiple: "multiple",
                                nameField: "title",
                                valueField: "id",
                                listable: false
                            },
                            department: {
                                field: "Department.name",
                                hideInForm: true
                            },
                            department_id: {
                                displayName: $rootScope.i18n.lang.department,
                                listable: false,
                                inputType: "select2"
                            }
                        };

                        if(structOnly) {
                            return fieldsStruct;
                        } else {
                            var defered = $q.defer();
                            DepartmentRes.query().$promise.then(function(data){
                                fieldsStruct.department_id.dataSource = data;
                            }, function(){
                                defered.reject();
                            }).then(function(){
                                AuthGroupRes.query().$promise.then(function(data){
                                    fieldsStruct.usergroup.dataSource = data;
                                    defered.resolve(fieldsStruct);
                                });
                            });
                            return defered.promise;
                        }
                    }
                };

                return service;
            }])
        .factory("AuthRuleModel", ["$rootScope", function($rootScope){
            return {
                getFieldsStruct : function() {
                    return {
                        id: {primary: true},
                        name: {},
                        title: {},
                        category: {
                            inputType: "select2",
                            dataSource: [
                                {id: "accounting", name: "高级财务模块"},
                                {id: "all", name: "公用模块"},
                                {id: "basedata", name: "基础数据"},
                                {id: "crm", name: "客户管理"},
                                {id: "finance", name: "基本财务模块"},
                                {id: "produce", name: "生产管理"},
                                {id: "sale", name: "销售模块"},
                                {id: "set", name: "设置模块"},
                                {id: "statistics", name: "统计模块"},
                                {id: "stock", name: "仓储管理"},
                            ]
                        }
                    };
                }
            };
        }])
        .factory("DepartmentModel", ["$rootScope", function($rootScope){
            return {
                getFieldsStruct: function(){
                    var i18n = $rootScope.i18n.lang;
                    return {
                        id : {
                            primary: true
                        },
                        name: {
                            displayName: i18n.category,
                            listable: false
                        },
                        prefix_name: {
                            hideInForm: true,
                            displayName: i18n.category
                        }
                    };
                }
            };
        }])
        .factory("AuthGroupModel", ["$rootScope", function($rootScope){
            return {
                getFieldsStruct: function(){
                    var i18n = $rootScope.i18n.lang;
                    return {
                        id : {
                            primary: true
                        },
                        title: {
                            displayName: i18n.name
                        }
                    };
                }
            };
        }])