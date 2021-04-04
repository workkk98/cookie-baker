/**
 * @file 操作storage的类
 */

import { setStorageItem, getStorageItem, removeStorageItem } from 'src/chrome/storage';
import Vue from 'vue'

export interface StrategyForm {
  origin: string;
  name: string;
  target: string;
  strategy: string;
}

const strategyID = 'strategyID';

// 因为chrome.storage类似于localstorage，不能存储对象等类型，故而在这里将strategyJSON化。
function strategyStringify (strategy: StrategyForm, value: string) {
  return !value ? `${JSON.stringify(strategy)}` : `${value};${JSON.stringify(strategy)}`;
}

function parseStrategy (value: string) {
  if (value.length === 0) {
    return [];
  }
  const strategyList = value.split(';');
  return strategyList.map<StrategyForm> (strategy => {

    // TODO: 更好的容错机制
    try {
      return JSON.parse(strategy);
    } catch (error) {
      console.error(error);
      return null;
    }
  }).filter(value => value !== null);
}

class StrategyStorage {

  public strategyList: StrategyForm[] = [];
  public strategyStr = '';

  public async get (refresh: boolean) {
    if (!refresh && this.strategyList.length > 0) {
      return this.strategyList;
    }

    // refresh，或strategyList的长度等于0都强制刷新

    try {
      const value = await getStorageItem(strategyID);
      this.strategyStr = (value as string);
      return this.strategyList = parseStrategy(value as string);
    } catch (err) {
      console.error(err);
      Vue.prototype.$message.error(err.message);
      return [];
    }
  }

  public async set (form: StrategyForm) {
    try {
      await setStorageItem(strategyID, strategyStringify(form, this.strategyStr));
    } catch (err) {
      console.error(err);
      Vue.prototype.$message.error(err.message);
      return Promise.reject(err);
    }
  }

  public async removeAll () {
    try {
      await removeStorageItem(strategyID);
    } catch (err) {
      console.error(err);
      Vue.prototype.$message.error(err.message);
      return Promise.reject(err);
    }
  }
}

export const strategyStorage = new StrategyStorage();