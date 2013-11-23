function(doc) {
  if (doc._id.substr(0,1) !== " ") {
    emit(doc._id, {
    	"id": doc._id,
    	"rev": doc._rev,
    	"itemname": doc.itemname,
    	"department": doc.department,
    	"desiredate": doc.desiredate,
    	"description": doc.description,
    	"searchtags": doc.searchtags
    });
  }
};