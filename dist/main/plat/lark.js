"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const notify_1 = __importDefault(require("./notify"));
class Lark extends notify_1.default {
    constructor(webhook, githubCtx, inputs) {
        super(webhook, githubCtx, inputs);
    }
    async notify() {
        const { ctxFormatContent, timestamp, signature: sign, inputs } = this;
        const requestPayload = {
            timestamp,
            sign,
            msg_type: 'interactive',
            card: {
                config: {
                    wide_screen_mode: true,
                    enable_forward: true,
                },
                header: {
                    title: {
                        content: `${inputs.notifyTitle}`,
                        tag: 'plain_text',
                    },
                    template: 'red',
                },
                elements: [
                    {
                        tag: 'div',
                        text: {
                            content: `**Author** ${ctxFormatContent.actor}`,
                            tag: 'lark_md',
                        },
                    },
                    {
                        tag: 'div',
                        text: {
                            content: `**Ref** ${ctxFormatContent.ref}  **Event** ${ctxFormatContent.eventName}`,
                            tag: 'lark_md',
                        },
                    },
                    {
                        tag: 'div',
                        text: {
                            content: `**Message**，\n ${inputs.notifyMessage || ctxFormatContent.commitsContent}`,
                            tag: 'lark_md',
                        },
                    },
                    {
                        actions: [
                            {
                                tag: 'button',
                                text: {
                                    content: 'More Information :玫瑰:',
                                    tag: 'lark_md',
                                },
                                url: `${ctxFormatContent.actionUrl}`,
                                type: 'default',
                                value: {},
                            },
                        ],
                        tag: 'action',
                    },
                ],
            },
        };
        const res = await axios_1.default({
            method: 'post',
            url: this.webhook,
            data: requestPayload,
        });
        return {
            code: res.code || res.data.StatusCode,
            data: res.data,
            msg: res.msg,
        };
    }
    genSin(signKey = this.signKey, timestamp) {
        const crytoStr = `${timestamp}\n${signKey}`;
        const signature = crypto_js_1.default.enc.Base64.stringify(crypto_js_1.default.HmacSHA256('', crytoStr));
        return signature;
    }
}
exports.default = Lark;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFyay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbGF0L2xhcmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBMEI7QUFDMUIsMERBQWlDO0FBRWpDLHNEQUFnRDtBQUVoRCxNQUFxQixJQUFLLFNBQVEsZ0JBQU07SUFDdEMsWUFBWSxPQUFlLEVBQUUsU0FBa0IsRUFBRSxNQUFXO1FBQzFELEtBQUssQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTTtRQUNWLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFFdEUsTUFBTSxjQUFjLEdBQUc7WUFDckIsU0FBUztZQUNULElBQUk7WUFDSixRQUFRLEVBQUUsYUFBYTtZQUN2QixJQUFJLEVBQUU7Z0JBQ0osTUFBTSxFQUFFO29CQUNOLGdCQUFnQixFQUFFLElBQUk7b0JBQ3RCLGNBQWMsRUFBRSxJQUFJO2lCQUNyQjtnQkFDRCxNQUFNLEVBQUU7b0JBQ04sS0FBSyxFQUFFO3dCQUNMLE9BQU8sRUFBRSxHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUU7d0JBQ2hDLEdBQUcsRUFBRSxZQUFZO3FCQUNsQjtvQkFDRCxRQUFRLEVBQUUsS0FBSztpQkFDaEI7Z0JBQ0QsUUFBUSxFQUFFO29CQUNSO3dCQUNFLEdBQUcsRUFBRSxLQUFLO3dCQUNWLElBQUksRUFBRTs0QkFDSixPQUFPLEVBQUUsY0FBYyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUU7NEJBQy9DLEdBQUcsRUFBRSxTQUFTO3lCQUNmO3FCQUNGO29CQUNEO3dCQUNFLEdBQUcsRUFBRSxLQUFLO3dCQUNWLElBQUksRUFBRTs0QkFDSixPQUFPLEVBQUUsV0FBVyxnQkFBZ0IsQ0FBQyxHQUFHLGVBQWUsZ0JBQWdCLENBQUMsU0FBUyxFQUFFOzRCQUNuRixHQUFHLEVBQUUsU0FBUzt5QkFDZjtxQkFDRjtvQkFDRDt3QkFDRSxHQUFHLEVBQUUsS0FBSzt3QkFDVixJQUFJLEVBQUU7NEJBQ0osT0FBTyxFQUFFLGtCQUFrQixNQUFNLENBQUMsYUFBYSxJQUFJLGdCQUFnQixDQUFDLGNBQWMsRUFBRTs0QkFDcEYsR0FBRyxFQUFFLFNBQVM7eUJBQ2Y7cUJBQ0Y7b0JBQ0Q7d0JBQ0UsT0FBTyxFQUFFOzRCQUNQO2dDQUNFLEdBQUcsRUFBRSxRQUFRO2dDQUNiLElBQUksRUFBRTtvQ0FDSixPQUFPLEVBQUUsdUJBQXVCO29DQUNoQyxHQUFHLEVBQUUsU0FBUztpQ0FDZjtnQ0FDRCxHQUFHLEVBQUUsR0FBRyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUU7Z0NBQ3BDLElBQUksRUFBRSxTQUFTO2dDQUNmLEtBQUssRUFBRSxFQUFFOzZCQUNWO3lCQUNGO3dCQUNELEdBQUcsRUFBRSxRQUFRO3FCQUNkO2lCQUNGO2FBQ0Y7U0FDRixDQUFDO1FBRUYsTUFBTSxHQUFHLEdBQVEsTUFBTSxlQUFLLENBQUM7WUFDM0IsTUFBTSxFQUFFLE1BQU07WUFDZCxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDakIsSUFBSSxFQUFFLGNBQWM7U0FDckIsQ0FBQyxDQUFDO1FBRUgsT0FBTztZQUNMLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVTtZQUNyQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7WUFDZCxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUc7U0FDYixDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUE4QixJQUFJLENBQUMsT0FBTyxFQUFFLFNBQWlCO1FBQ2xFLE1BQU0sUUFBUSxHQUFHLEdBQUcsU0FBUyxLQUFLLE9BQU8sRUFBRSxDQUFDO1FBQzVDLE1BQU0sU0FBUyxHQUFHLG1CQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsbUJBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFFbkYsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztDQUNGO0FBcEZELHVCQW9GQyJ9