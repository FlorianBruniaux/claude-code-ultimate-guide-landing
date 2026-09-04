# GA4 outcome measurement gate

GA4 has recorded zero conversions in the audited 28-day and 90-day windows. That count is PROUVÉ for those windows and the audited property. It does not prove why the count is zero. The configuration cause remains UNKNOWN.

## Preserve the historical event vocabulary

Do not rename these existing events. A key-event decision changes GA4 configuration outside this repository and must keep the event names below so historical data remains comparable.

| Objective candidate | Existing event | External decision |
| --- | --- | --- |
| Complete the quiz | `quiz_complete` | Decide whether to mark as a key event. |
| Subscribe for recap cards | `recap_card_subscribe` | Decide whether to mark as a key event. |
| Subscribe for an ebook | `ebook_subscribe` | Decide whether to mark as a key event. |
| Download a file | `file_download` | Decide which files qualify as outcomes. |

The decision owner, key-event configuration, and DebugView evidence are UNKNOWN. No external configuration changed during this repository task.

## DebugView validation record

Validate one controlled occurrence of every retained event in GA4 DebugView before changing its key-event state. Record the date and time, event name, hostname, `page_location` or page path, source, medium, campaign when present, relevant file identifier for `file_download`, and the device or browser used for the test. Confirm that the hostname remains `cc.bruniaux.com` throughout the collection path.

Do not send email addresses, names, phone numbers, free-text form content, raw IP addresses, or any other personal data in event names, parameters, user properties, campaign fields, or debugging notes. Use a non-production test identity where one is needed, and store the evidence under the access controls that apply to the GA4 property.

## Singapore traffic investigation

Singapore remains UNKNOWN. Before any traffic filter, collect the date range and compare source, medium, landing page, campaign, hour, user agent, server logs, and bot-control signals. A geographical pattern alone does not prove bot traffic or invalid traffic.

Do not create a GA4 filter, audience exclusion, server rule, or bot-control block until the cause is proven and the external change record names the owner, exact rule, effective scope, validation result, and rollback action. Preserve the pre-change query and the rollback record with the decision.
