var Subject = /** @class */ (function () {
    /**
     * Constructor
     */
    function Subject() {
        this._observers = new Array();
    }
    /**
     * Adds an observer to the subject
     * @param observer Observer to add
     */
    Subject.prototype.addObserver = function (observer) {
        this._observers.push(observer);
    };
    /**
     * Notifies all observers of the subject
     */
    Subject.prototype.notify = function () {
        this._observers.forEach(function (observer) {
            observer.notify();
        });
    };
    return Subject;
}());
//# sourceMappingURL=subject.js.map