export type Alert = {
  message: string;
  sentAt: Date;
  receivedAt: Date;
};

export type Receiver = {
  id: string;
  coords: [number, number];
  alerts: Alert[];
};

const generateRandomCoords = (center: [number, number]): [number, number] => {
  // Generates a random radius
  const randomRadius = 10000 + Math.sqrt(Math.random()) * 200000;

  const randomBearing = Math.random() * 2 * Math.PI;
  const earthRadiusInMeters = 6371000;

  const deltaLat = randomRadius / earthRadiusInMeters * Math.sin(randomBearing);
  const deltaLon = randomRadius / earthRadiusInMeters * Math.cos(randomBearing) / Math.cos(center[1]);

  return [center[0] + deltaLon, center[1] + deltaLat];
};

const generateRandomDate = (start: Date) => {
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};


const hoursToSendAlertInAdvance = [1, 2, 3, 4, 5];
const generateAlertsForReceiver = (numberOfAlerts: number, receivedAtStartingPoint: Date): Alert[] => {
  const alerts: Alert[] = [];

  if (hoursToSendAlertInAdvance.length === 0) {
    throw new Error('hoursToSendAlertInAdvance is empty');
  }

  for (let i = 0; i < numberOfAlerts; i++) {
    const receivedAt = generateRandomDate(receivedAtStartingPoint);
    const sentAt = new Date(receivedAt.getTime() - (hoursToSendAlertInAdvance[i % hoursToSendAlertInAdvance.length] ?? 0) * 3600 * 1000);

    alerts.push({
      message: `ALERT! A fire is predicted to reach your location in ${hoursToSendAlertInAdvance[i % hoursToSendAlertInAdvance.length]} hours`,
      sentAt,
      receivedAt
    });
  }

  return alerts;
}


export const generateMockReceivers = (centerCoord: [number, number], n: number): Receiver[] => {
  const receivers = Array.from({ length: n }, (_, i) => {
    const id = String(i);
    let coords: [number, number] = [0, 0];
    try {
      coords = generateRandomCoords(centerCoord);
    } catch (error) {
      console.error('Error generating random coordinates:', error);
    }

    // Assume the earth is a flat plane to simplify calculation in this case
    const distanceToCenterInMeters = Math.sqrt(Math.pow(coords[0] - centerCoord[0], 2) + Math.pow(coords[1] - centerCoord[1], 2)) * 111111;

    // We'll make those within 5km to have at least 2 alerts, and reduce as we move further out
    const numberOfAlerts = Math.max(1, Math.round((5000 - distanceToCenterInMeters) / 2000) + 2);
    const alerts = generateAlertsForReceiver(numberOfAlerts, new Date('October 01, 2023 00:00:00'));

    return {
      id,
      coords,
      alerts
    };
  });

  return receivers;
};


