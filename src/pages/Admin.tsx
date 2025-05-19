import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DiscordCard } from '@/components/ui/discord-card';
import { getAllReports, updateReportStatus } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Report, ReportType, ReportStatus } from '@/types';
import { toast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Search, 
  UserX, 
  Bug, 
  Clock, 
  CheckCircle, 
  Filter, 
  SortDesc, 
  XCircle
} from 'lucide-react';

export default function Admin() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<ReportType | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<ReportStatus | 'all'>('all');
  const { isAdmin } = useAuth();
  
  useEffect(() => {
    const fetchReports = () => {
      setLoading(true);
      getAllReports((fetchedReports) => {
        setReports(fetchedReports);
        setLoading(false);
      });
    };
    
    if (isAdmin) {
      fetchReports();
    }
  }, [isAdmin]);
  
  const handleResolveReport = async (report: Report) => {
    try {
      const result = await updateReportStatus(
        report.id, 
        report.type, 
        ReportStatus.RESOLVED
      );
      
      if (result.success) {
        toast({
          title: "Report Resolved",
          description: "The report has been marked as resolved.",
        });
        
        // Update the local state
        setReports(prevReports => 
          prevReports.map(r => 
            r.id === report.id ? { ...r, status: ReportStatus.RESOLVED } : r
          )
        );
      } else {
        toast({
          title: "Failed to resolve report",
          description: "An error occurred. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error resolving report:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };
  
  const handleReopenReport = async (report: Report) => {
    try {
      const result = await updateReportStatus(
        report.id, 
        report.type, 
        ReportStatus.OPEN
      );
      
      if (result.success) {
        toast({
          title: "Report Reopened",
          description: "The report has been reopened.",
        });
        
        // Update the local state
        setReports(prevReports => 
          prevReports.map(r => 
            r.id === report.id ? { ...r, status: ReportStatus.OPEN } : r
          )
        );
      } else {
        toast({
          title: "Failed to reopen report",
          description: "An error occurred. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error reopening report:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };
  
  // Filter and search reports
  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      searchTerm === '' || 
      (report.type === ReportType.USER && 
        ('targetUsername' in report && 
          report.targetUsername.toLowerCase().includes(searchTerm.toLowerCase()))) ||
      (report.type === ReportType.BUG && 
        ('description' in report && 
          report.description.toLowerCase().includes(searchTerm.toLowerCase())));
    
    const matchesTypeFilter = filter === 'all' || report.type === filter;
    const matchesStatusFilter = statusFilter === 'all' || report.status === statusFilter;
    
    return matchesSearch && matchesTypeFilter && matchesStatusFilter;
  });
  
  if (loading) {
    return (
      <div className="container px-4 mx-auto py-8">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5865F2]"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container px-4 mx-auto py-8">
      <div className="flex items-center justify-center gap-4 mb-8">
        <Shield className="w-10 h-10 text-[#5865F2]" />
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>
      
      <div className="max-w-5xl mx-auto space-y-8">
        <DiscordCard>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B9BBBE]" size={18} />
              <Input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#40444B] border-[#36393F] text-white"
              />
            </div>
            
            <div className="flex gap-2">
              <div className="flex items-center gap-2 bg-[#40444B] rounded-md px-3">
                <Filter size={16} className="text-[#B9BBBE]" />
                <select 
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as ReportType | 'all')}
                  className="bg-transparent text-white border-none focus:ring-0 text-sm py-2"
                >
                  <option value="all">All Types</option>
                  <option value={ReportType.USER}>User Reports</option>
                  <option value={ReportType.BUG}>Bug Reports</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2 bg-[#40444B] rounded-md px-3">
                <SortDesc size={16} className="text-[#B9BBBE]" />
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as ReportStatus | 'all')}
                  className="bg-transparent text-white border-none focus:ring-0 text-sm py-2"
                >
                  <option value="all">All Status</option>
                  <option value={ReportStatus.OPEN}>Open</option>
                  <option value={ReportStatus.RESOLVED}>Resolved</option>
                </select>
              </div>
            </div>
          </div>
        </DiscordCard>
        
        {filteredReports.length === 0 ? (
          <DiscordCard>
            <div className="flex flex-col items-center justify-center py-8">
              <XCircle className="h-16 w-16 text-[#B9BBBE] mb-4" />
              <h3 className="text-xl font-bold mb-2">No reports found</h3>
              <p className="text-[#B9BBBE] text-center">
                {reports.length === 0 
                  ? "There are currently no reports in the system." 
                  : "No reports match your search criteria."}
              </p>
            </div>
          </DiscordCard>
        ) : (
          filteredReports.map((report) => (
            <DiscordCard key={report.id}>
              <div className="flex justify-between">
                <div className="flex items-center gap-2 mb-4">
                  {report.type === ReportType.USER ? (
                    <UserX className="h-6 w-6 text-[#ED4245]" />
                  ) : (
                    <Bug className="h-6 w-6 text-[#FEE75C]" />
                  )}
                  <h3 className="text-xl font-bold">
                    {report.type === ReportType.USER 
                      ? `User Report: ${'targetUsername' in report ? report.targetUsername : 'Unknown User'}`
                      : 'Bug Report'}
                  </h3>
                </div>
                
                <Badge 
                  className={
                    report.status === ReportStatus.OPEN 
                      ? "bg-[#ED4245] hover:bg-[#ED4245]/80" 
                      : "bg-green-500 hover:bg-green-500/80"
                  }
                >
                  {report.status === ReportStatus.OPEN ? 'OPEN' : 'RESOLVED'}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-[#B9BBBE] mb-1">Reported by:</p>
                  <p className="text-white">{report.reporterEmail}</p>
                  <p className="text-[#B9BBBE] text-sm">Discord ID: {report.reporterDiscordId}</p>
                </div>
                
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-[#B9BBBE] mt-1" />
                  <div>
                    <p className="text-sm text-[#B9BBBE] mb-1">Reported on:</p>
                    <p className="text-white">
                      {new Date(report.createdAt).toLocaleString('en-US', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </p>
                  </div>
                </div>
              </div>
              
              {report.type === ReportType.USER && 'targetDiscordId' in report && (
                <div className="mb-4 p-3 bg-[#2F3136] rounded-md">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-[#B9BBBE] mb-1">Target User:</p>
                      <p className="text-white">{report.targetUsername}</p>
                      <p className="text-[#B9BBBE] text-sm">Discord ID: {report.targetDiscordId}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-[#B9BBBE] mb-1">Server:</p>
                      <p className="text-white">{report.serverName}</p>
                      <p className="text-[#B9BBBE] text-sm">Server ID: {report.serverId}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mb-4">
                <p className="text-sm text-[#B9BBBE] mb-2">Description:</p>
                <p className="text-white whitespace-pre-line p-3 bg-[#2F3136] rounded-md">
                  {report.description}
                </p>
              </div>
              
              {report.type === ReportType.BUG && 'stepsToReproduce' in report && (
                <div className="mb-4">
                  <p className="text-sm text-[#B9BBBE] mb-2">Steps to Reproduce:</p>
                  <p className="text-white whitespace-pre-line p-3 bg-[#2F3136] rounded-md">
                    {report.stepsToReproduce}
                  </p>
                </div>
              )}
              
              {report.screenshotUrl && (
                <div className="mb-4">
                  <p className="text-sm text-[#B9BBBE] mb-2">Screenshot:</p>
                  <img 
                    src={report.screenshotUrl} 
                    alt="Report Screenshot" 
                    className="max-w-full rounded-md border border-[#40444B]" 
                  />
                </div>
              )}
              
              <div className="flex justify-end">
                {report.status === ReportStatus.OPEN ? (
                  <Button 
                    onClick={() => handleResolveReport(report)}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark as Resolved
                  </Button>
                ) : (
                  <Button 
                    onClick={() => handleReopenReport(report)}
                    className="bg-[#ED4245] hover:bg-[#ED4245]/80 text-white"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reopen Report
                  </Button>
                )}
              </div>
            </DiscordCard>
          ))
        )}
      </div>
    </div>
  );
}