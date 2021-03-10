function sortJobsDataByProperty(objArray, prop, orderBy){
  if (arguments.length<2) throw new Error("sortJsonArrayByProp requires 2 arguments");
  var order = arguments.length>2 ? orderBy : 1; //Default to ascending

    var propPath = (prop.constructor===Array) ? prop : prop.split(".");

    return objArray.sort(function(a,b){
        
        for (var p in propPath){
            if (a[propPath[p]] && b[propPath[p]]){
                a = a[propPath[p]];
                b = b[propPath[p]];
            }
        }
        return ( (a < b) ? -1*order : ((a > b) ? 1*order : 0) );
    });
}

export default sortJobsDataByProperty;