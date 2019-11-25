import { EventEmitter } from 'events';

const EVENT_NAME = 'hit';

export class Testeves {
  private _event: EventEmitter;
  private _disabled: boolean | ((...args: any[]) => boolean);

  public observation: { [key: string]: any };
  public isFinished: Promise<any>;
  public finishProcess: (value?: any) => void = () => {
    throw new Error('finishProcess not initialized yet');
  };
  public finishWithError: (value?: any) => void = () => {
    throw new Error('finishWithError not initialized yet');
  };

  constructor({
    disabled = false,
    disableNativeListener = false,
  }: {
    disabled?: boolean | ((...args: any[]) => boolean);
    disableNativeListener?: boolean;
  } = {}) {
    if (typeof disabled === 'function') {
      this._disabled = disabled();
    } else {
      this._disabled = disabled;
    }

    this._event = new EventEmitter();
    this.observation = {};
    this.isFinished = new Promise((resolve, reject) => {
      this.finishProcess = data => resolve(data);
      this.finishWithError = err => reject(err);
    });

    if (!disableNativeListener && !disabled) {
      this._event.addListener(EVENT_NAME, (data: { [key: string]: any }) => {
        Object.assign(this.observation, data);
      });
    }
  }

  listen({
    customListener = undefined,
  }: {
    customListener?: (value: any) => void;
  } = {}) {
    if (this._disabled) {
      return;
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
    if (this._disabled) {
      return;
    }
    this._event.emit(EVENT_NAME, data);
  }
}
