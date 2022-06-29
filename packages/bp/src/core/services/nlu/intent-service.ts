import * as sdk from 'botpress/sdk'
import { FlowView } from 'common/typings'
import { GhostService } from 'core/bpfs'
import { sanitizeFileName } from 'core/misc/utils'
import _ from 'lodash'

import { NLUService } from './nlu-service'

const INTENTS_DIR = './intents'

export class IntentService {
  constructor(private ghostService: GhostService, private nluService: NLUService) {}

  private async intentExists(botId: string, intentName: string): Promise<boolean> {
    return this.ghostService.forBot(botId).fileExists(INTENTS_DIR, `${intentName}.json`)
  }

  public async getIntents(botId: string): Promise<sdk.NLU.IntentDefinition[]> {
    const intentNames = await this.ghostService.forBot(botId).directoryListing(INTENTS_DIR, '*.json')
    return Promise.map(intentNames, n => this.getIntent(botId, n))
  }

  public async getIntent(botId: string, intentName: string): Promise<sdk.NLU.IntentDefinition> {
    intentName = sanitizeFileName(intentName)
    if (intentName.length < 1) {
      throw new Error('Invalid intent name, expected at least one character')
    }

    if (!(await this.intentExists(botId, intentName))) {
      throw new Error('Intent does not exist')
    }
    return this.ghostService.forBot(botId).readFileAsObject(INTENTS_DIR, `${intentName}.json`)
  }

  public async findMatches(msg, utter) {
    return utter.filter(matches => {
      const regex = new RegExp(msg, 'gi')
      return matches.match(regex)
    })
  }

  public async deleteBracket(utrArray) {
    var stack = new Array()
    var str = new Array()
    var answer = new Array()
    for (let i = 0; i < utrArray.length; i++) {
      const utterance = utrArray[i]
      const bigBracket = utterance.replace(/[\[\]']+/g,'')
      for(let x of bigBracket) {
        stack.push(x)
      }
      for(let j = 0; j < utterance.length; j++) {
        let tmp = stack.pop()

        if(tmp === '(') {
          while (str.pop() !== ')') {}
        } else {
          str.push(tmp)
        }    
      }
      const tmputr = str.reverse().join('')     
      answer.push(tmputr) 
      stack.length = 0
      str.length = 0       
    }     
    return answer   
  }
}
