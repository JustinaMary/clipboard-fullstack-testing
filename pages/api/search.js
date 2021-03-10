import jobs from "../../data/jobs";

export default (req, res) => {
    debugger
  res.statusCode = 200;
  const searchValue = req.query.search;
  let jobData = {jobs: jobs};
  let resultData = [];
  jobData.jobs.map((each) => {
        let result = [], found_flag = false;
        for (let i = 0; i < each.items.length; i++) {
          const item = each.items[i];
          const getAllKeys = Object.keys(item);
          for (let j = 0; j < getAllKeys.length; j++) {
            const key = getAllKeys[j];
            if (item[key].toString().toLowerCase().includes(searchValue.toLowerCase())) {
              found_flag = true;
              result.push(item);
              break;
            }
          }
        }
        if (found_flag) {
          each.items = [...result];
          resultData.push(each);
        }
      });
  res.json({jobs: resultData});
};
