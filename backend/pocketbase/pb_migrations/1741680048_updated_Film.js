/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_91977388")

  // remove field
  collection.fields.removeById("file326466351")

  // add field
  collection.fields.addAt(12, new Field({
    "exceptDomains": null,
    "hidden": false,
    "id": "url326466351",
    "name": "bandeannonce",
    "onlyDomains": null,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "url"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_91977388")

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "file326466351",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "bandeannonce",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  // remove field
  collection.fields.removeById("url326466351")

  return app.save(collection)
})
