'use strict';

/* jasmine specs for controllers go here */
describe('PhoneCat controllers', function() {

  describe('giftListCtrl', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(module('phonecatApp'));
    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('gifts/gifts.json').
          respond([{id: 'Wine in Italy'}, {id: 'Day Trip to Assisi'}]);

      scope = $rootScope.$new();
      ctrl = $controller('giftListCtrl', {$scope: scope});
    }));


    it('should create "gifts" model with 2 phones fetched from xhr', function() {
      expect(scope.gifts).toBeUndefined();
      $httpBackend.flush();

      expect(scope.gifts).toEqual([{id: 'Wine in Italy'},
                                   {id: 'Day Trip to Assisi'}]);
    });


    it('should set the default value of orderProp model', function() {
      expect(scope.orderProp).toBe('id');
    });
  });


  describe('receptionInfoCtrl', function(){
  });
});
