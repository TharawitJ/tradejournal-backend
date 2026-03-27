function calculatePnL(data: any) {
  return data.map((record:any) => {
    const {
      entryPrice,
      SL,
      TP,
      exitDateTime,
      entryDateTime,
      margin,
      winLose,
      leverage,
    } = record;

    const duration =
      exitDateTime && entryDateTime
        ? (new Date(exitDateTime).getTime() -
            new Date(entryDateTime).getTime()) /
          1000
        : null;

    let slPercent = null;
    let tpPercent = null;

    if (entryPrice && SL && TP) {
      slPercent = Math.abs((entryPrice - SL) / entryPrice);
      tpPercent = Math.abs((TP - entryPrice) / entryPrice);
    }

    let profitPosition = 0;

    if (winLose && slPercent !== null && tpPercent !== null) {
      if (winLose.toUpperCase() === "WIN") {
        profitPosition = margin * leverage * tpPercent;
      } else {
        profitPosition = -margin * leverage * slPercent;
      }
    }

    return {
      duration,
      slPercent,
      tpPercent,
      profitPosition,
      winLose,
    };
  });
}

function calWinRate(data: any) {
  const { winLose } = data;

  if (winLose) {
    return winLose.trim().toUpperCase() === "WIN";
  }

  const winFilterRecord = data.filter((record: any) => {
    if (record.winLose) {
      return record.winLose.trim().toUpperCase() === "WIN";
    }
  });
  const winrate = (winFilterRecord.length / data.length) * 100;
  return winrate;
}

function calAverageRR(data: any) {
  if (!data.length) return 0;

  const rrList = data
    .filter((filterR: any) => filterR.entryPrice && filterR.SL && filterR.TP)
    .map((mapR: any) => {
      const risk = Math.abs((mapR.entryPrice! - mapR.SL!) / mapR.entryPrice!);
      const reward = Math.abs((mapR.TP! - mapR.entryPrice!) / mapR.entryPrice!);
      return reward / risk;
    });
  if (!rrList.length) return 0;

  const sum = rrList.reduce((prev: any, curr: any) => prev + curr, 0);
  return sum / rrList.length;
}

export { calAverageRR, calWinRate, calculatePnL };
