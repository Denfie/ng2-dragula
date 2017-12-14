webpackJsonp([0,2],{

/***/ 210:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dragulaExpt = __webpack_require__(598);
exports.dragula = dragulaExpt.default || dragulaExpt;


/***/ }),

/***/ 211:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var dragula_class_1 = __webpack_require__(210);
var core_1 = __webpack_require__(0);
var DragulaService = (function () {
    function DragulaService() {
        this.cancel = new core_1.EventEmitter();
        this.cloned = new core_1.EventEmitter();
        this.drag = new core_1.EventEmitter();
        this.dragend = new core_1.EventEmitter();
        this.drop = new core_1.EventEmitter();
        this.out = new core_1.EventEmitter();
        this.over = new core_1.EventEmitter();
        this.remove = new core_1.EventEmitter();
        this.shadow = new core_1.EventEmitter();
        this.dropModel = new core_1.EventEmitter();
        this.removeModel = new core_1.EventEmitter();
        this.events = [
            'cancel', 'cloned', 'drag', 'dragend', 'drop', 'out', 'over',
            'remove', 'shadow', 'dropModel', 'removeModel'
        ];
        this.bags = [];
    }
    DragulaService.prototype.add = function (name, drake) {
        var bag = this.find(name);
        if (bag) {
            throw new Error('Bag named: "' + name + '" already exists.');
        }
        bag = { name: name, drake: drake };
        this.bags.push(bag);
        if (drake.models) {
            this.handleModels(name, drake);
        }
        if (!bag.initEvents) {
            this.setupEvents(bag);
        }
        return bag;
    };
    DragulaService.prototype.find = function (name) {
        for (var _i = 0, _a = this.bags; _i < _a.length; _i++) {
            var bag = _a[_i];
            if (bag.name === name) {
                return bag;
            }
        }
    };
    DragulaService.prototype.destroy = function (name) {
        var bag = this.find(name);
        var i = this.bags.indexOf(bag);
        this.bags.splice(i, 1);
        bag.drake.destroy();
    };
    DragulaService.prototype.setOptions = function (name, options) {
        var bag = this.add(name, dragula_class_1.dragula(options));
        this.handleModels(name, bag.drake);
    };
    DragulaService.prototype.handleModels = function (name, drake) {
        var _this = this;
        var dragElm;
        var dragIndex;
        var dropIndex;
        var sourceModel;
        drake.on('remove', function (el, source) {
            if (!drake.models) {
                return;
            }
            sourceModel = drake.models[drake.containers.indexOf(source)];
            sourceModel.splice(dragIndex, 1);
            // console.log('REMOVE');
            // console.log(sourceModel);
            _this.removeModel.emit([name, el, source]);
        });
        drake.on('drag', function (el, source) {
            dragElm = el;
            dragIndex = (el.getAttribute('filter-index')) ? +el.getAttribute('filter-index') : _this.domIndexOf(el, source);
        });
        drake.on('drop', function (dropElm, target, source) {
            if (!drake.models || !target) {
                return;
            }
            dropIndex = _this.domIndexOf(dropElm, target);
            sourceModel = drake.models[drake.containers.indexOf(source)];
            // console.log('DROP');
            // console.log(sourceModel);
            if (target === source) {
                sourceModel.splice(dropIndex, 0, sourceModel.splice(dragIndex, 1)[0]);
            }
            else {
                var notCopy = dragElm === dropElm;
                var targetModel = drake.models[drake.containers.indexOf(target)];
                var dropElmModel = notCopy ? sourceModel[dragIndex] : JSON.parse(JSON.stringify(sourceModel[dragIndex]));
                if (notCopy) {
                    sourceModel.splice(dragIndex, 1);
                }
                targetModel.splice(dropIndex, 0, dropElmModel);
                target.removeChild(dropElm); // element must be removed for ngFor to apply correctly
            }
            _this.dropModel.emit([name, dropElm, target, source]);
        });
    };
    DragulaService.prototype.setupEvents = function (bag) {
        bag.initEvents = true;
        var that = this;
        var emitter = function (type) {
            function replicate() {
                var args = Array.prototype.slice.call(arguments);
                that[type].emit([bag.name].concat(args));
            }
            bag.drake.on(type, replicate);
        };
        this.events.forEach(emitter);
    };
    DragulaService.prototype.domIndexOf = function (child, parent) {
        return Array.prototype.indexOf.call(parent.children, child);
    };
    return DragulaService;
}());
DragulaService = __decorate([
    core_1.Injectable()
], DragulaService);
exports.DragulaService = DragulaService;


/***/ }),

/***/ 212:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 212;


/***/ }),

/***/ 327:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var dragula_provider_1 = __webpack_require__(211);
var dragula_class_1 = __webpack_require__(210);
var DragulaDirective = (function () {
    function DragulaDirective(el, dragulaService) {
        this.el = el;
        this.dragulaService = dragulaService;
        this.container = el.nativeElement;
    }
    DragulaDirective.prototype.ngOnInit = function () {
        var _this = this;
        // console.log(this.bag);
        var bag = this.dragulaService.find(this.dragula);
        var checkModel = function () {
            if (_this.dragulaModel) {
                if (_this.drake.models) {
                    _this.drake.models.push(_this.dragulaModel);
                }
                else {
                    _this.drake.models = [_this.dragulaModel];
                }
            }
        };
        if (bag) {
            this.drake = bag.drake;
            checkModel();
            this.drake.containers.push(this.container);
        }
        else {
            this.drake = dragula_class_1.dragula([this.container], Object.assign({}, this.dragulaOptions));
            checkModel();
            this.dragulaService.add(this.dragula, this.drake);
        }
    };
    DragulaDirective.prototype.ngOnChanges = function (changes) {
        // console.log('dragula.directive: ngOnChanges');
        // console.log(changes);
        if (changes && changes.dragulaModel) {
            if (this.drake) {
                if (this.drake.models) {
                    var modelIndex = this.drake.models.indexOf(changes.dragulaModel.previousValue);
                    this.drake.models.splice(modelIndex, 1, changes.dragulaModel.currentValue);
                }
                else {
                    this.drake.models = [changes.dragulaModel.currentValue];
                }
            }
        }
    };
    return DragulaDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DragulaDirective.prototype, "dragula", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DragulaDirective.prototype, "dragulaModel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DragulaDirective.prototype, "dragulaOptions", void 0);
DragulaDirective = __decorate([
    core_1.Directive({ selector: '[dragula]' }),
    __metadata("design:paramtypes", [core_1.ElementRef, dragula_provider_1.DragulaService])
], DragulaDirective);
exports.DragulaDirective = DragulaDirective;


/***/ }),

/***/ 328:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dragula_class_1 = __webpack_require__(210);
exports.dragula = dragula_class_1.dragula;
var dragula_directive_1 = __webpack_require__(327);
exports.DragulaDirective = dragula_directive_1.DragulaDirective;
var dragula_provider_1 = __webpack_require__(211);
exports.DragulaService = dragula_provider_1.DragulaService;
var dragular_module_1 = __webpack_require__(621);
exports.DragulaModule = dragular_module_1.DragulaModule;


/***/ }),

/***/ 329:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__(438);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(413);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(437);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_module__ = __webpack_require__(434);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app_app_module__["a" /* DragulaDemoModule */]);
//# sourceMappingURL=/Users/denfie/GitHub/_Privat/git-fork/ng2-dragula/demo/src/main.js.map

/***/ }),

/***/ 433:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DemoComponent; });

var DemoComponent = (function () {
    function DemoComponent() {
    }
    return DemoComponent;
}());
DemoComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'example-app',
        template: "\n    <div class=\"examples\">\n      <example-a></example-a>\n    \n      <example-b></example-b>\n    \n      <another-example></another-example>\n    \n      <such-example></such-example>\n    \n      <very-example></very-example>\n    \n      <much-example></much-example>\n    \n      <wow-example></wow-example>\n    \n      <repeat-example></repeat-example>\n      \n      <filter-example></filter-example>\n    \n      <nested-repeat-example></nested-repeat-example>\n    </div>\n  ",
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    })
], DemoComponent);

//# sourceMappingURL=/Users/denfie/GitHub/_Privat/git-fork/ng2-dragula/demo/src/app.component.js.map

/***/ }),

/***/ 434:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_dragula__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_dragula___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_dragula__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__examples__ = __webpack_require__(436);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__callback_pipe__ = __webpack_require__(435);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(433);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DragulaDemoModule; });








var DragulaDemoModule = (function () {
    function DragulaDemoModule() {
    }
    return DragulaDemoModule;
}());
DragulaDemoModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__callback_pipe__["a" /* CallbackparamsPipe */],
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* DemoComponent */]
        ].concat(__WEBPACK_IMPORTED_MODULE_5__examples__["a" /* EXAMPLES */]),
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_4_ng2_dragula__["DragulaModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_common__["a" /* CommonModule */]
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* DemoComponent */]]
    })
], DragulaDemoModule);

//# sourceMappingURL=/Users/denfie/GitHub/_Privat/git-fork/ng2-dragula/demo/src/app.module.js.map

/***/ }),

/***/ 435:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CallbackparamsPipe; });

var CallbackparamsPipe = (function () {
    function CallbackparamsPipe() {
    }
    CallbackparamsPipe.prototype.transform = function (items, callback, params) {
        if (!items || !callback) {
            return items;
        }
        var _params = params || {};
        return items.filter(function (item) { return callback(item, _params); });
    };
    return CallbackparamsPipe;
}());
CallbackparamsPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'callbackparams',
        pure: false
    })
], CallbackparamsPipe);

//# sourceMappingURL=/Users/denfie/GitHub/_Privat/git-fork/ng2-dragula/demo/src/callback.pipe.js.map

/***/ }),

/***/ 436:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_dragula__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_dragula___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_dragula__);
/* unused harmony export ExampleAComponent */
/* unused harmony export ExampleBComponent */
/* unused harmony export AnotherExampleComponent */
/* unused harmony export SuchExampleComponent */
/* unused harmony export VeryExampleComponent */
/* unused harmony export MuchExampleComponent */
/* unused harmony export WowExampleComponent */
/* unused harmony export RepeatExampleComponent */
/* unused harmony export FilterExampleComponent */
/* unused harmony export NestedRepeatExampleComponent */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EXAMPLES; });
/* tslint:disable */


var ExampleAComponent = (function () {
    function ExampleAComponent() {
    }
    return ExampleAComponent;
}());
ExampleAComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'example-a',
        template: __webpack_require__(601)
    })
], ExampleAComponent);

var ExampleBComponent = (function () {
    function ExampleBComponent(dragulaService) {
        var _this = this;
        this.dragulaService = dragulaService;
        dragulaService.drag.subscribe(function (value) {
            // console.log(`drag: ${value[0]}`); // value[0] will always be bag name
            _this.onDrag(value.slice(1));
        });
        dragulaService.drop.subscribe(function (value) {
            // console.log(`drop: ${value[0]}`);
            _this.onDrop(value.slice(1));
        });
        dragulaService.over.subscribe(function (value) {
            // console.log(`over: ${value[0]}`);
            _this.onOver(value.slice(1));
        });
        dragulaService.out.subscribe(function (value) {
            // console.log(`out: ${value[0]}`);
            _this.onOut(value.slice(1));
        });
    }
    ExampleBComponent.prototype.hasClass = function (el, name) {
        return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(el.className);
    };
    ExampleBComponent.prototype.addClass = function (el, name) {
        if (!this.hasClass(el, name)) {
            el.className = el.className ? [el.className, name].join(' ') : name;
        }
    };
    ExampleBComponent.prototype.removeClass = function (el, name) {
        if (this.hasClass(el, name)) {
            el.className = el.className.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');
        }
    };
    ExampleBComponent.prototype.onDrag = function (args) {
        var e = args[0];
        this.removeClass(e, 'ex-moved');
    };
    ExampleBComponent.prototype.onDrop = function (args) {
        var e = args[0];
        this.addClass(e, 'ex-moved');
    };
    ExampleBComponent.prototype.onOver = function (args) {
        var el = args[0];
        this.addClass(el, 'ex-over');
    };
    ExampleBComponent.prototype.onOut = function (args) {
        var el = args[0];
        this.removeClass(el, 'ex-over');
    };
    return ExampleBComponent;
}());
ExampleBComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'example-b',
        template: __webpack_require__(602)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_dragula__["DragulaService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_dragula__["DragulaService"]) === "function" && _a || Object])
], ExampleBComponent);

var AnotherExampleComponent = (function () {
    function AnotherExampleComponent(dragulaService) {
        this.dragulaService = dragulaService;
        dragulaService.setOptions('third-bag', {
            removeOnSpill: true
        });
    }
    return AnotherExampleComponent;
}());
AnotherExampleComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'another-example',
        template: __webpack_require__(600)
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_dragula__["DragulaService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_dragula__["DragulaService"]) === "function" && _b || Object])
], AnotherExampleComponent);

var SuchExampleComponent = (function () {
    function SuchExampleComponent(dragulaService) {
        this.dragulaService = dragulaService;
        dragulaService.setOptions('fourth-bag', {
            revertOnSpill: true
        });
    }
    return SuchExampleComponent;
}());
SuchExampleComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'such-example',
        template: __webpack_require__(607)
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_dragula__["DragulaService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_dragula__["DragulaService"]) === "function" && _c || Object])
], SuchExampleComponent);

var VeryExampleComponent = (function () {
    function VeryExampleComponent(dragulaService) {
        this.dragulaService = dragulaService;
        dragulaService.setOptions('fifth-bag', {
            copy: true
        });
    }
    return VeryExampleComponent;
}());
VeryExampleComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'very-example',
        template: __webpack_require__(608)
    }),
    __metadata("design:paramtypes", [typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_dragula__["DragulaService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_dragula__["DragulaService"]) === "function" && _d || Object])
], VeryExampleComponent);

var MuchExampleComponent = (function () {
    function MuchExampleComponent(dragulaService) {
        this.dragulaService = dragulaService;
        dragulaService.setOptions('sixth-bag', {
            moves: function (el, container, handle) {
                console.log(el, container);
                return handle.className === 'handle';
            }
        });
    }
    return MuchExampleComponent;
}());
MuchExampleComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'much-example',
        template: __webpack_require__(604)
    }),
    __metadata("design:paramtypes", [typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_dragula__["DragulaService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_dragula__["DragulaService"]) === "function" && _e || Object])
], MuchExampleComponent);

var WowExampleComponent = (function () {
    function WowExampleComponent() {
        this.clicked = {
            'one': false,
            'two': false,
            'three': false,
            'four': false,
            'five': false,
            'six': false,
            'seven': false
        };
    }
    WowExampleComponent.prototype.onclick = function (key) {
        var _this = this;
        this.clicked[key] = true;
        setTimeout(function () {
            _this.clicked[key] = false;
        }, 2000);
    };
    return WowExampleComponent;
}());
WowExampleComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'wow-example',
        template: __webpack_require__(609)
    })
], WowExampleComponent);

var RepeatExampleComponent = (function () {
    function RepeatExampleComponent(dragulaService) {
        var _this = this;
        this.dragulaService = dragulaService;
        this.many = ['The', 'possibilities', 'are', 'endless!'];
        this.many2 = ['Explore', 'them'];
        dragulaService.dropModel.subscribe(function (value) {
            _this.onDropModel(value.slice(1));
        });
        dragulaService.removeModel.subscribe(function (value) {
            _this.onRemoveModel(value.slice(1));
        });
    }
    RepeatExampleComponent.prototype.onDropModel = function (args) {
        var el = args[0], target = args[1], source = args[2];
        console.log('onDropModel:');
        console.log(el);
        console.log(target);
        console.log(source);
    };
    RepeatExampleComponent.prototype.onRemoveModel = function (args) {
        var el = args[0], source = args[1];
        console.log('onRemoveModel:');
        console.log(el);
        console.log(source);
    };
    return RepeatExampleComponent;
}());
RepeatExampleComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'repeat-example',
        template: __webpack_require__(606)
    }),
    __metadata("design:paramtypes", [typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_dragula__["DragulaService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_dragula__["DragulaService"]) === "function" && _f || Object])
], RepeatExampleComponent);

var FilterExampleComponent = (function () {
    function FilterExampleComponent(dragulaService) {
        var _this = this;
        this.dragulaService = dragulaService;
        this.many = ['The', 'possibilities', 'are', 'endless!', 'Try', 'filtering!'];
        this.many2 = ['Explore', 'them'];
        dragulaService.dropModel.subscribe(function (value) {
            _this.onDropModel(value.slice(1));
        });
        dragulaService.removeModel.subscribe(function (value) {
            _this.onRemoveModel(value.slice(1));
        });
    }
    FilterExampleComponent.prototype.filterMany = function (item, searchValue) {
        if (searchValue && (searchValue.length >= 0)) {
            return (item.indexOf(searchValue) !== -1);
        }
        else {
            return true;
        }
    };
    FilterExampleComponent.prototype.onDropModel = function (args) {
        var el = args[0], target = args[1], source = args[2];
        console.log('onDropModel:');
        console.log(el);
        console.log(target);
        console.log(source);
    };
    FilterExampleComponent.prototype.onRemoveModel = function (args) {
        var el = args[0], source = args[1];
        console.log('onRemoveModel:');
        console.log(el);
        console.log(source);
    };
    return FilterExampleComponent;
}());
FilterExampleComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'filter-example',
        template: __webpack_require__(603)
    }),
    __metadata("design:paramtypes", [typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_dragula__["DragulaService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_dragula__["DragulaService"]) === "function" && _g || Object])
], FilterExampleComponent);

var NestedRepeatExampleComponent = (function () {
    function NestedRepeatExampleComponent() {
        this.groups = [
            {
                name: 'Group A',
                items: [{ name: 'Item A' }, { name: 'Item B' }, { name: 'Item C' }, { name: 'Item D' }]
            },
            {
                name: 'Group B',
                items: [{ name: 'Item 1' }, { name: 'Item 2' }, { name: 'Item 3' }, { name: 'Item 4' }]
            }
        ];
    }
    return NestedRepeatExampleComponent;
}());
NestedRepeatExampleComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'nested-repeat-example',
        template: __webpack_require__(605)
    })
], NestedRepeatExampleComponent);

var EXAMPLES = [
    ExampleAComponent,
    ExampleBComponent,
    AnotherExampleComponent,
    SuchExampleComponent,
    VeryExampleComponent,
    MuchExampleComponent,
    WowExampleComponent,
    RepeatExampleComponent,
    FilterExampleComponent,
    NestedRepeatExampleComponent
];
var _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=/Users/denfie/GitHub/_Privat/git-fork/ng2-dragula/demo/src/examples.js.map

/***/ }),

/***/ 437:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: true
};
//# sourceMappingURL=/Users/denfie/GitHub/_Privat/git-fork/ng2-dragula/demo/src/environment.js.map

/***/ }),

/***/ 438:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ts_helpers__ = __webpack_require__(623);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ts_helpers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ts_helpers__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_symbol__ = __webpack_require__(456);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_object__ = __webpack_require__(449);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_function__ = __webpack_require__(445);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_int__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_parse_float__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_number__ = __webpack_require__(448);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_math__ = __webpack_require__(447);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_string__ = __webpack_require__(455);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_date__ = __webpack_require__(444);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_array__ = __webpack_require__(443);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_regexp__ = __webpack_require__(453);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_map__ = __webpack_require__(446);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_set__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es6_reflect__ = __webpack_require__(452);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_core_js_es7_reflect__ = __webpack_require__(457);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_zone_js_dist_zone__ = __webpack_require__(624);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_zone_js_dist_zone__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_classlist_polyfill__ = __webpack_require__(440);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_classlist_polyfill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17_classlist_polyfill__);
// This file includes polyfills needed by Angular 2 and is loaded before
// the app. You can add your own extra polyfills to this file.


















//# sourceMappingURL=/Users/denfie/GitHub/_Privat/git-fork/ng2-dragula/demo/src/polyfills.js.map

/***/ }),

/***/ 600:
/***/ (function(module, exports) {

module.exports = "<div class='parent'>\n    <label for='hy'>Need to be able to quickly delete stuff when it spills out of the chosen containers? Note how you\n        can easily sort the items in any containers by just dragging and dropping.</label>\n    <div class='wrapper'>\n        <div class='container' [dragula]='\"third-bag\"'>\n            <div>Banana Boat</div>\n            <div>Orange Juice</div>\n            <div>Cuban Cigar</div>\n            <div>Terrible Comedian</div>\n            <div>Anxious Cab Driver</div>\n            <div>Thriving Venture</div>\n            <div>Calm Clam</div>\n        </div>\n    </div>\n    <pre>\n      <code>\n&lt;div [dragula]=&#039;&quot;third-bag&quot;&#039;&gt;&lt;/div&gt;\n\nclass AnotherExample &#123;\n  constructor(private dragulaService: DragulaService) &#123;\n    dragulaService.setOptions('third-bag', &#123;\n      removeOnSpill: true\n    });\n  }\n}\n      </code>\n    </pre>\n</div>"

/***/ }),

/***/ 601:
/***/ (function(module, exports) {

module.exports = "<div class='parent'>\n    <label for='hy'>Move stuff between these two containers. Note how the stuff gets inserted near the mouse pointer?\n        Great stuff.</label>\n    <div class='wrapper'>\n        <div class='container' [dragula]='\"first-bag\"'>\n            <div>You can move these elements between these two containers</div>\n            <div>Moving them anywhere else isn't quite possible</div>\n            <div>There's also the possibility of moving elements around in the same container, changing their position\n            </div>\n        </div>\n        <div class='container' [dragula]='\"first-bag\"'>\n            <div>This is the default use case. You only need to specify the containers you want to use</div>\n            <div>More interactive use cases lie ahead</div>\n            <div>Make sure to check out the <a href='https://github.com/bevacqua/dragula#readme'>documentation on\n                GitHub!</a></div>\n        </div>\n    </div>\n    <pre>\n      <code>\n&lt;div [dragula]=&#039;&quot;first-bag&quot;&#039;&gt;&lt;/div&gt;\n&lt;div [dragula]=&#039;&quot;first-bag&quot;&#039;&gt;&lt;/div&gt;\n      </code>\n    </pre>\n</div>"

/***/ }),

/***/ 602:
/***/ (function(module, exports) {

module.exports = "<div class=\"parent\">\n    <label for=\"hy\">There are plenty of events along the lifetime of a drag event. <a href=\"https://github.com/bevacqua/dragula#drakeon-events\">all of them</a> in the docs!</label>\n    <div class=\"wrapper\">\n        <div class=\"container\" [dragula]=\"'second-bag'\">\n            <div>As soon as you start dragging an element, a <code>drag</code> event is fired</div>\n            <div>Whenever an element is cloned because <code>copy: true</code>, a <code>cloned</code> event fires</div>\n            <div>The <code>shadow</code> event fires whenever the placeholder showing where an element would be dropped is moved to a different container or position</div>\n            <div>A <code>drop</code> event is fired whenever an element is dropped anywhere other than its origin <em>(where it was initially dragged from)</em></div>\n        </div>\n        <div class=\"container\" [dragula]=\"'second-bag'\">\n            <div>If the element gets removed from the DOM as a result of dropping outside of any containers, a <code>remove</code> event gets fired</div>\n            <div>A <code>cancel</code> event is fired when an element would be dropped onto an invalid target, but retains its original placement instead</div>\n            <div>The <code>over</code> event fires when you drag something over a container, and <code>out</code> fires when you drag it away from the container</div>\n            <div>Lastly, a <code>dragend</code> event is fired whenever a drag operation ends, regardless of whether it ends in a cancellation, removal, or drop</div>\n        </div>\n    </div>\n    <pre>\n      <code>\n&lt;div [dragula]=&#039;&quot;second-bag&quot;&#039;&gt;&lt;/div&gt;\n&lt;div [dragula]=&#039;&quot;second-bag&quot;&#039;&gt;&lt;/div&gt;\n\nclass ExampleB &#123;\n\n  constructor(private dragulaService: DragulaService) &#123;\n    dragulaService.drag.subscribe((value) => &#123;\n      this.onDrag(value.slice(1));\n    });\n    dragulaService.drop.subscribe((value) => &#123;\n      this.onDrop(value.slice(1));\n    });\n    dragulaService.over.subscribe((value) => &#123;\n      this.onOver(value.slice(1));\n    });\n    dragulaService.out.subscribe((value) => &#123;\n      this.onOut(value.slice(1));\n    });\n  }\n\n  private hasClass(el: any, name: string) &#123;\n    return new RegExp('(?:^|\\\\s+)' + name + '(?:\\\\s+|$)').test(el.className);\n  }\n\n  private addClass(el: any, name: string) &#123;\n    if (!this.hasClass(el, name)) &#123;\n      el.className = el.className ? [el.className, name].join(' ') : name;\n    }\n  }\n\n  private removeClass(el: any, name: string) &#123;\n    if (this.hasClass(el, name)) &#123;\n      el.className = el.className.replace(new RegExp('(?:^|\\\\s+)' + name + '(?:\\\\s+|$)', 'g'), '');\n    }\n  }\n\n  private onDrag(args) &#123;\n    let [e, el] = args;\n    this.removeClass(e, 'ex-moved');\n  }\n\n  private onDrop(args) &#123;\n    let [e, el] = args;\n    this.addClass(e, 'ex-moved');\n  }\n\n  private onOver(args) &#123;\n    let [e, el, container] = args;\n    this.addClass(el, 'ex-over');\n  }\n\n  private onOut(args) &#123;\n    let [e, el, container] = args;\n    this.removeClass(el, 'ex-over');\n  }\n}\n      </code>\n    </pre>\n</div>"

/***/ }),

/***/ 603:
/***/ (function(module, exports) {

module.exports = "<div class='parent'>\n  <label for='hy'><strong>Angular-specific filter example.</strong> Fancy some <code>ngFor</code>?</label>\n  <div class='wrapper'>\n      <div class='container'>\n        <input type='text' [(ngModel)]='searchMany' placeholder='Search many'>\n        <div class='container' [dragula]='\"another-bag\"' [dragulaModel]='many'>\n            <div *ngFor='let text of many | callbackparams: filterMany: searchMany' [innerHtml]='text' [attr.filter-index]='many.indexOf(text)'></div>\n        </div>\n      </div>\n      <div class='container'>\n          <input type='text' [(ngModel)]='searchMany2' placeholder='Search many2'>\n          <div class='container' [dragula]='\"another-bag\"' [dragulaModel]='many2'>\n              <div *ngFor='let text of many2 | callbackparams: filterMany: searchMany2' [innerHtml]='text' [attr.filter-index]='many2.indexOf(text)'></div>\n          </div>\n      </div>\n  </div>\n  <div class='wrapper'>\n      <div class='container'>\n          <pre>{{many | json}}</pre>\n      </div>\n      <div class='container'>\n          <pre>{{many2 | json}}</pre>\n      </div>\n  </div>\n  <pre>\n    <code>\n&lt;div class='wrapper'&gt;\n  &lt;div class='container'&gt;\n    &lt;input type='text' [(ngModel)]='searchMany' placeholder='Search many'&gt;\n    &lt;div class='container' [dragula]='&quot;another-bag&quot;' [dragulaModel]='many'&gt;\n      &lt;div *ngFor='let text of many | callbackparams: filterMany: searchMany'\n              [innerHtml]='text'\n              [attr.filter-index]='many.indexOf(text)'&gt;&lt;/div&gt;\n    &lt;/div&gt;\n  &lt;div class='container'&gt;\n    &lt;input type='text' [(ngModel)]='searchMany2' placeholder='Search many2'&gt;\n    &lt;div class='container' [dragula]='&quot;another-bag&quot;' [dragulaModel]='many2'&gt;\n      &lt;div *ngFor='let text of many2 | callbackparams: filterMany: searchMany2'\n              [innerHtml]='text'\n              [attr.filter-index]='many2.indexOf(text)'&gt;&lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;\n\nclass RepeatExample &#123;\npublic searchMany: string;\npublic searchMany2: string;\npublic many: Array&lt;string&gt; = ['The', 'possibilities', 'are', 'endless!', 'Try', 'filtering!'];\npublic many2: Array&lt;string&gt; = ['Explore', 'them'];\n\nconstructor(private dragulaService: DragulaService) &#123;\n  dragulaService.dropModel.subscribe((value) => &#123;\n    this.onDropModel(value.slice(1));\n  });\n  dragulaService.removeModel.subscribe((value) => &#123;\n    this.onRemoveModel(value.slice(1));\n  });\n}\n\npublic filterMany(item: string, searchValue: string) &#123;\n  if (searchValue &amp;&amp; (searchValue.length >= 0)) &#123;\n    return (item.indexOf(searchValue) !== -1);\n  } else &#123;\n    return true;\n  }\n}\n\nprivate onDropModel(args) &#123;\n  let [el, target, source] = args;\n  // do something else\n}\n\nprivate onRemoveModel(args) &#123;\n  let [el, source] = args;\n  // do something else\n}\n}\n    </code>\n  </pre>\n</div>"

/***/ }),

/***/ 604:
/***/ (function(module, exports) {

module.exports = "<div class='parent'>\n    <label for='hy'>Drag handles float your cruise?</label>\n    <div class='wrapper'>\n        <div class='container' [dragula]='\"sixth-bag\"'>\n            <div><span class='handle'>+</span>Move me, but you can use the plus sign to drag me around.</div>\n            <div><span class='handle'>+</span>Note that <code>handle</code> element in the <code>moves</code> handler is\n                just the original event target.\n            </div>\n        </div>\n        <div class='container' [dragula]='\"sixth-bag\"'>\n            <div><span class='handle'>+</span>This might also be useful if you want multiple children of an element to\n                be able to trigger a drag event.\n            </div>\n            <div><span class='handle'>+</span>You can also use the <code>moves</code> option to determine whether an\n                element can be dragged at all from a container, <em>drag handle or not</em>.\n            </div>\n        </div>\n    </div>\n    <pre>\n      <code>\n&lt;div [dragula]=&#039;&quot;sixth-bag&quot;&#039;&gt;&lt;/div&gt;\n&lt;div [dragula]=&#039;&quot;sixth-bag&quot;&#039;&gt;&lt;/div&gt;\n\nclass MuchExample &#123;\n  constructor(private dragulaService: DragulaService) &#123;\n    dragulaService.setOptions('sixth-bag', &#123;\n      moves: function (el, container, handle) &#123;\n        return handle.className === 'handle';\n      }\n    });\n  }\n}\n      </code>\n    </pre>\n    <div>There are a few similar mechanisms to determine whether an element can be dragged from a certain container <a\n            href='https://github.com/bevacqua/dragula#optionsmoves'>(<code>moves</code>)</a>, whether an element can be\n        dropped into a certain container at a certain position <a\n                href='https://github.com/bevacqua/dragula#optionsaccepts'>(<code>accepts</code>)</a>, and whether an\n        element is able to originate a drag event <a href='https://github.com/bevacqua/dragula#optionsinvalid'>(<code>invalid</code>)</a>.\n    </div>\n</div>"

/***/ }),

/***/ 605:
/***/ (function(module, exports) {

module.exports = "<div class='parent'>\n    <label for='hy'><strong>Angular-specific example.</strong> Fancy some nested <code>ngFor</code>?</label>\n    <div class='wrapper'>\n        <div class='container' *ngFor='let group of groups' [dragula]=\"'nested-bag'\">\n            <span>{{group.name}}</span>\n            <div *ngFor='let item of group.items' [innerHtml]='item.name'></div>\n        </div>\n    </div>\n    <pre>\n      <code>\n&lt;div class='wrapper'&gt;\n  &lt;div class='container' *ngFor='let group of groups' [dragula]='&quot;nested-bag&quot;'&gt;\n    &lt;div *ngFor='let item of group.items' [innerHtml]='item.name'&gt;&lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;\n\nclass NestedRepeatExample &#123;\n  public groups: Array&lt;any&gt; = [\n    &#123;\n      name: 'Group A',\n      items: [&#123;name: 'Item A'},&#123;name: 'Item B'},&#123;name: 'Item C'},&#123;name: 'Item D'}]\n    },\n    &#123;\n      name: 'Group B',\n      items: [&#123;name: 'Item 1'},&#123;name: 'Item 2'},&#123;name: 'Item 3'},&#123;name: 'Item 4'}]\n    }\n  ];\n}\n      </code>\n    </pre>\n</div>"

/***/ }),

/***/ 606:
/***/ (function(module, exports) {

module.exports = "<div class='parent'>\n    <label for='hy'><strong>Angular-specific example.</strong> Fancy some <code>ngFor</code>?</label>\n    <div class='wrapper'>\n        <div class='container' [dragula]='\"another-bag\"' [dragulaModel]='many'>\n            <div *ngFor='let text of many' [innerHtml]='text'></div>\n        </div>\n        <div class='container' [dragula]='\"another-bag\"' [dragulaModel]='many2'>\n            <div *ngFor='let text of many2' [innerHtml]='text'></div>\n        </div>\n    </div>\n    <div class='wrapper'>\n        <div class='container'>\n            <pre>{{many | json}}</pre>\n        </div>\n        <div class='container'>\n            <pre>{{many2 | json}}</pre>\n        </div>\n    </div>\n    <pre>\n      <code>\n&lt;div class='wrapper'&gt;\n  &lt;div class='container' [dragula]='&quot;another-bag&quot;' [dragulaModel]='many'&gt;\n    &lt;div *ngFor='let text of many' [innerHtml]='text'&gt;&lt;/div&gt;\n  &lt;/div&gt;\n  &lt;div class='container' [dragula]='&quot;another-bag&quot;' [dragulaModel]='many2'&gt;\n    &lt;div *ngFor='let text of many2' [innerHtml]='text'&gt;&lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;\n\nclass RepeatExample &#123;\n  public many: Array&lt;string&gt; = ['The', 'possibilities', 'are', 'endless!'];\n  public many2: Array&lt;string&gt; = ['Explore', 'them'];\n\n  constructor(private dragulaService: DragulaService) &#123;\n    dragulaService.dropModel.subscribe((value) => &#123;\n      this.onDropModel(value.slice(1));\n    });\n    dragulaService.removeModel.subscribe((value) => &#123;\n      this.onRemoveModel(value.slice(1));\n    });\n  }\n\n  private onDropModel(args) &#123;\n    let [el, target, source] = args;\n    // do something else\n  }\n\n  private onRemoveModel(args) &#123;\n    let [el, source] = args;\n    // do something else\n  }\n}\n      </code>\n    </pre>\n</div>"

/***/ }),

/***/ 607:
/***/ (function(module, exports) {

module.exports = "<div class='parent'>\n    <label for='hy'>By default, dropping an element outside of any known containers will keep the element in the last\n        place it went over. You can make elements go back to origin if they're dropped outside of known containers,\n        too.</label>\n    <div class='wrapper'>\n        <div class='container' [dragula]='\"fourth-bag\"'>\n            <div>Moving items between containers works as usual</div>\n            <div>If you try to drop an item outside of any containers, though, it'll retain its original position</div>\n            <div>When that happens, a <code>cancel</code> event will be raised</div>\n        </div>\n        <div class='container' [dragula]='\"fourth-bag\"'>\n            <div>Note that the dragged element will go back to the place you originally dragged it from, even if you\n                move it over other containers\n            </div>\n            <div>This is useful if you want to ensure drop events only happen when the user intends for them to happen\n                explicitly, avoiding surprises\n            </div>\n        </div>\n    </div>\n    <pre>\n      <code>\n&lt;div [dragula]=&#039;&quot;fourth-bag&quot;&#039;&gt;&lt;/div&gt;\n&lt;div [dragula]=&#039;&quot;fourth-bag&quot;&#039;&gt;&lt;/div&gt;\n\nclass SuchExample &#123;\n  constructor(private dragulaService: DragulaService) &#123;\n    dragulaService.setOptions('fourth-bag', &#123;\n      revertOnSpill: true\n    });\n  }\n}\n      </code>\n    </pre>\n</div>"

/***/ }),

/***/ 608:
/***/ (function(module, exports) {

module.exports = "<div class='parent'>\n    <label for='hy'>Copying stuff is common too, so we made it easy for you.</label>\n    <div class='wrapper'>\n        <div class='container' [dragula]='\"fifth-bag\"'>\n            <div>When elements are copyable, they can't be sorted in their origin container</div>\n            <div>Copying prevents original elements from being dragged. A copy gets created and <em>that</em> gets\n                dragged instead\n            </div>\n            <div>Whenever that happens, a <code>cloned</code> event is raised</div>\n        </div>\n        <div class='container' [dragula]='\"fifth-bag\"'>\n            <div>Note that the clones get destroyed if they're not dropped into another container</div>\n            <div>You'll be dragging a copy, so when they're dropped into another container you'll see the duplication.\n            </div>\n        </div>\n    </div>\n    <pre>\n      <code>\n&lt;div [dragula]=&#039;&quot;fifth-bag&quot;&#039;&gt;&lt;/div&gt;\n&lt;div [dragula]=&#039;&quot;fifth-bag&quot;&#039;&gt;&lt;/div&gt;\n\nclass VeryExample &#123;\n  constructor(private dragulaService: DragulaService) &#123;\n    dragulaService.setOptions('fifth-bag', &#123;\n      copy: true\n    });\n  }\n}\n      </code>\n    </pre>\n</div>"

/***/ }),

/***/ 609:
/***/ (function(module, exports) {

module.exports = "<div class='parent'>\n    <label><strong>Click or Drag!</strong> Fires a click when the mouse button is released before a <code>mousemove</code> event, otherwise a drag event is fired. No extra configuration is necessary.</label>\n    <div class='wrapper'>\n        <div class='container' [dragula]='\"seventh-bag\"'>\n            <div (click)='onclick(\"one\")'>{{clicked.one ? \"Clicked!\" : \"Clicking on these elements triggers a regular click event you can listen to.\"}}</div>\n            <div (click)='onclick(\"two\")'>{{clicked.two ? \"Clicked!\" : \"Try dragging or clicking on this element.\"}}</div>\n            <div (click)='onclick(\"three\")'>{{clicked.three ? \"Clicked!\" : \"Note how you can click normally?\"}}</div>\n            <div (click)='onclick(\"four\")'>{{clicked.four ? \"Clicked!\" : \"Drags don't trigger click events.\"}}</div>\n            <div (click)='onclick(\"five\")'>{{clicked.five ? \"Clicked!\" : \"Clicks don't end up in a drag, either.\"}}</div>\n            <div (click)='onclick(\"six\")'>{{clicked.six ? \"Clicked!\" : \"This is useful if you have elements that can be both clicked or dragged.\"}}</div>\n            <div (click)='onclick(\"seven\")'>{{clicked.seven ? \"ZOMG, THAT TICKLES! PLEASE. STOP.\" : \"Business as usual.\"}}</div>\n        </div>\n    </div>\n    <pre>\n      <code>\n&lt;div [dragula]=&#039;&quot;seventh-bag&quot;&#039;&gt;&lt;/div&gt;\n\nclass WowExample &#123;\n  public clicked: any = &#123;\n    'one': false,\n    'two': false,\n    'three': false,\n    'four': false,\n    'five': false,\n    'six': false,\n    'seven': false\n  };\n\n  public onclick(key): void &#123;\n    this.clicked[key] = true;\n    setTimeout(() => &#123;\n      this.clicked[key] = false;\n    }, 2000);\n  }\n}\n      </code>\n    </pre>\n</div>"

/***/ }),

/***/ 621:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = __webpack_require__(0);
var dragula_directive_1 = __webpack_require__(327);
var dragula_provider_1 = __webpack_require__(211);
var DragulaModule = (function () {
    function DragulaModule() {
    }
    return DragulaModule;
}());
DragulaModule = __decorate([
    core_1.NgModule({
        exports: [dragula_directive_1.DragulaDirective],
        declarations: [dragula_directive_1.DragulaDirective],
        providers: [dragula_provider_1.DragulaService]
    })
], DragulaModule);
exports.DragulaModule = DragulaModule;


/***/ }),

/***/ 625:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(329);


/***/ })

},[625]);
//# sourceMappingURL=main.bundle.js.map