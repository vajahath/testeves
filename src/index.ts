import { EventEmitter } from 'events';

const EVENT_NAME = 'hit';

export class Testeves {
  private _event: EventEmitter;
  public observation: object;
  public isFinished: Promise<any>;
  public finishProcess: (value?: any) => void = () => {
    throw new Error('finishProcess not initialized yet');
  };
  public finishWithError: (value?: any) => void = () => {
    throw new Error('finishWithError not initialized yet');
  };

  constructor() {
    this._event = new EventEmitter();
    this.observation = {};
    this.isFinished = new Promise((resolve, reject) => {
      this.finishProcess = data => resolve(data);
      this.finishWithError = err => reject(err);
    });
  }

  listen({
    customListener = undefined,
    disableNativeListener = false,
  }: {
    customListener?: (value: any) => void;
    disableNativeListener?: boolean;
  } = {}) {
    if (!disableNativeListener) {
      this._event.addListener(EVENT_NAME, (data: { [key: string]: any }) => {
        Object.assign(this.observation, data);
      });
    }

    if (customListener) {
      if (typeof customListener === 'function') {
        this._event.addListener(EVENT_NAME, customListener);
      } else {
        throw new Error('customListener should be a function');
      }
    }

    return this.observation;
  }

  emit(data: { [key: string]: any }) {
    this._event.emit(EVENT_NAME, data);
  }
}
