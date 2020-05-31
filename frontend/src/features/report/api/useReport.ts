import axios from 'axios';
import { useQuery } from 'react-query';

export interface ReportTask {
  id: string;
  title: string;
  time: number;
  completed: boolean;
  scope?: { id: string; name: string; shortCode: string };
  section: {
    id: string;
    title: string;
    isPlan: boolean;
  };
}

export interface ReportDto {
  dayId: string;
  day: string;
  totalTime: number;
  totalTasks: number;
  completedTasks: number;
  tasks: ReportTask[];
}

const fetchReport = async (_: string, dayId: string) => {
  const { data } = await axios.get<ReportDto>(`/api/report/${dayId}`);
  return data;
};

export const useReport = (dayId?: string) => {
  return useQuery(dayId ? ['report', dayId] : null, fetchReport);
};

export const timePerSection = ({ tasks }: ReportDto) => {
  return tasks.reduce((acc, { section, time }) => {
    if (section.isPlan) {
      return acc;
    }

    if (acc[section.id]) {
      // eslint-disable-next-line no-param-reassign
      acc[section.id].time += time;
    } else {
      // eslint-disable-next-line no-param-reassign
      acc[section.id] = {
        title: section.title,
        time,
      };
    }
    return acc;
  }, {} as Record<string, { title: string; time: number }>);
};

export const selectTimePerSectionPieChartData = (report: ReportDto) =>
  Object.entries(timePerSection(report)).map(([sectionId, section]) => ({
    id: sectionId,
    label: section.title,
    value: section.time,
  }));

export const selectTasksTableData = ({ tasks }: ReportDto) => {
  const tasksPerScope = tasks.reduce(
    (acc, { section, time, completed, title, scope, id }) => {
      if (section.isPlan) {
        return acc;
      }

      if (time === 0) {
        return acc;
      }

      const task = { id, title, completed, time };

      if (!scope) {
        acc[0].tasks.push(task);
      } else {
        const scopeIndex = acc.findIndex(({ id: scopeId }) => scopeId === scope.id);

        if (scopeIndex === -1) {
          acc.push({
            id: scope.id,
            scopeTitle: `${scope.name} - ${scope.shortCode.toUpperCase()}`,
            tasks: [task],
          });
        } else {
          acc[scopeIndex].tasks.push(task);
        }
      }

      return acc;
    },
    [
      {
        scopeTitle: 'No Scope',
        id: 'no-scope',
        tasks: [],
      },
    ] as {
      scopeTitle: string;
      id: string;
      time?: number;
      tasks: Pick<ReportTask, 'id' | 'title' | 'completed' | 'time'>[];
    }[],
  );

  // Sum all tasks time and add it as the scope's time property
  return tasksPerScope.reduce((acc, scope, index) => {
    // eslint-disable-next-line no-param-reassign
    acc[index].time = scope.tasks.reduce((totalTime, { time }) => totalTime + time, 0);
    return acc;
  }, tasksPerScope);
};
