import calculateAttributesFor from './calculateAttributesFor'

import calcCharacteristicStepForValue from './characteristics/calculateStepForValue'
import calcWoundThresholdForValue from './characteristics/calculateWoundThresholdForValue'
import calcRecoveryTestsForValue from './characteristics/calculateRecoveryTestsForValue'

import applyEffectsFor from '@/charDecorator/effects/applyEffectsFor'

export default function (char) {
  const { tou } = calculateAttributesFor(char)
  const touStep = calcCharacteristicStepForValue(tou);
  console.log(tou)

  const unconsciousnessThreshold = tou * 2;
  const deathThreshold = unconsciousnessThreshold + touStep;
  const woundThreshold = calcWoundThresholdForValue(tou);
  const recoveryTestsPerDay = calcRecoveryTestsForValue(tou);

  const obj = {
    unconsciousnessThreshold,
    deathThreshold,
    woundThreshold,
    recoveryTestsPerDay,
    recoveryTestStep: touStep,
  }

  console.log(">> obj", obj);
  
  const modified = applyEffectsFor(char, obj)

  console.log(">> modified", modified);
  
  return modified
}