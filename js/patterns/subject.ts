class Subject
{
    /**
     * Observers of the subject
     */
    private _observers: Array<Observer>;

    /**
     * Constructor
     */
    constructor()
    {
        this._observers = new Array<Observer>();
    }

    /**
     * Adds an observer to the subject
     * @param observer Observer to add
     */
    addObserver(observer: Observer)
    {
        this._observers.push(observer);
    }

    /**
     * Notifies all observers of the subject
     */
    notify()
    {
        this._observers.forEach((observer) =>
        {
            observer.notify();
        });
    }
}