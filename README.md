# modal-bs3ui

Modals using Bootstrap 3 with Meteor UI (spacebars)

Design goals:

* Reactive everywhere.  Pass text or TEMPLATES
* Open/close state stored in Sessions

```js
	Template.profile.events({
		'click .user': function(event, tpl) {
			modal({
				context: this,
				title: this.fullname,
				body: "userBadgeBody"
			});
		}
	});
```

<table>
	<tr>
		<td>body</td>
		<td>*Name* of Template to be used as the Modal body</td>
	</tr><tr>
		<td>context</td>
		<td>Context to load dialog template with (relevant for body template too).
		  Usually `this` (from Template event).  Avoid relying on *functions*,
		  as they won't be available on code reload.</td>
	</tr><tr>
		<td>message</td>
		<td>*Text* to be used as the dialog body</td>
	</tr>
</table>

## Partially Reactive (and very convenient)

* Fully reactive on initial load, partially reactive after a hot code push
* Note: hot code pushes rely on `eval` to resume callback functions :(

buttons vs context?

## Full reactivity (with a tiny bit more work)

buttons vs context?



in anonymous functions given to modal, don't use external variables, use session variables
