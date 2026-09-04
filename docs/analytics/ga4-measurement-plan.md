# GA4 outcome measurement gate

`PROUVÉ` means this task has direct local evidence. `PARTIEL` means the evidence proves only the stated portion. `DÉCLARÉ` means an audit or GA4 reported the fact without a complete local read of that system in this task. `UNKNOWN` means no evidence supports the claim in this task.

The audit classifies zero recorded conversions as PROUVÉ for its audited 28-day and 90-day windows. This task records that audit result as DÉCLARÉ because it did not read GA4 directly. Neither statement proves why the count is zero. The configuration cause remains UNKNOWN.

## Preserve the historical event vocabulary

Do not rename these existing events. A key-event decision changes GA4 configuration outside this repository and must keep the event names below so historical data remains comparable.

| Objective candidate | Existing event | Local source evidence | GA4 reception | External decision |
| --- | --- | --- | --- | --- |
| Complete the quiz | `quiz_complete` | PROUVÉ | UNKNOWN | Decide whether to mark as a key event. |
| Subscribe for recap cards | `recap_card_subscribe` | PROUVÉ | UNKNOWN | Decide whether to mark as a key event. |
| Subscribe for an ebook | `ebook_subscribe` | PROUVÉ | UNKNOWN | Decide whether to mark as a key event. |
| Download a file | `file_download` | DÉCLARÉ | UNKNOWN | Prove the emitter or GA4 configuration, then decide which files qualify as outcomes. |

The repository directly proves the source presence of `quiz_complete`, `recap_card_subscribe`, and `ebook_subscribe`. It does not prove that GA4 received any of them. `file_download` remains DÉCLARÉ until a local emitter or the GA4 configuration is inspected. The decision owner, key-event configuration, and DebugView evidence are UNKNOWN. It is PROUVÉ that this repository task did not change external configuration.

## DebugView validation record

Validate one controlled occurrence of every retained event in GA4 DebugView before changing its key-event state. Record the date and time, event name, hostname, `page_location` or page path, source, medium, campaign when present, relevant file identifier for `file_download`, and the device or browser used for the test. Confirm that the hostname remains `cc.bruniaux.com` throughout the collection path.

Do not send email addresses, names, phone numbers, free-text form content, raw IP addresses, or any other personal data in event names, parameters, user properties, campaign fields, or debugging notes. Use a non-production test identity where one is needed, and store the evidence under the access controls that apply to the GA4 property.

## Singapore traffic investigation

Singapore remains UNKNOWN. Before any traffic filter, collect the date range and compare source, medium, landing page, campaign, hour, user agent, server logs, and bot-control signals. A geographical pattern alone does not prove bot traffic or invalid traffic.

Do not create a GA4 filter, audience exclusion, server rule, or bot-control block until the cause is proven and the external change record names the owner, exact rule, effective scope, validation result, and rollback action. Preserve the pre-change query and the rollback record with the decision.
