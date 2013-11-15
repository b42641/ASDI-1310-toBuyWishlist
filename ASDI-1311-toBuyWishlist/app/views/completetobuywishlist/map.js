function(doc) {
  if (doc._id.substr(0,1) === "5") {
    emit(doc._id, {
    	"itemname": doc.itemname,
    	"department": doc.department,
    	"desiredate": doc.desiredate,
    	"description": doc.description,
    	"searchtags": doc.searchtags
    });
  }
};