'use client'

import { useState } from 'react'
import { Resource, deleteResource, duplicateResource } from '@/lib/actions/resources'
import { formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { MoreHorizontal, Copy, Edit, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

interface ResourceListProps {
  resources: Resource[]
}

export function ResourceList({ resources }: ResourceListProps) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [isDuplicating, setIsDuplicating] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resource?')) return

    setIsDeleting(id)
    try {
      const result = await deleteResource(id)
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success('Resource deleted')
      }
    } catch (error) {
      toast.error('Failed to delete resource')
    } finally {
      setIsDeleting(null)
    }
  }

  const handleDuplicate = async (id: string) => {
    setIsDuplicating(id)
    try {
      const result = await duplicateResource(id)
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success('Resource duplicated')
      }
    } catch (error) {
      toast.error('Failed to duplicate resource')
    } finally {
      setIsDuplicating(null)
    }
  }

  const getStatusBadge = (status: Resource['status']) => {
    const variants: Record<Resource['status'], 'default' | 'secondary' | 'outline'> = {
      draft: 'secondary',
      active: 'default',
      archived: 'outline',
    }
    return <Badge variant={variants[status]}>{status}</Badge>
  }

  if (resources.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No resources yet</p>
        <Button asChild>
          <Link href="/dashboard/resources/new">Create your first resource</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resources.map((resource) => (
            <TableRow key={resource.id}>
              <TableCell>
                <Link
                  href={`/dashboard/resources/${resource.id}`}
                  className="font-medium hover:underline"
                >
                  {resource.name}
                </Link>
                {resource.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {resource.description}
                  </p>
                )}
              </TableCell>
              <TableCell>{getStatusBadge(resource.status)}</TableCell>
              <TableCell className="text-muted-foreground">
                {formatDate(resource.created_at)}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/resources/${resource.id}/edit`}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDuplicate(resource.id)}
                      disabled={isDuplicating === resource.id}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      {isDuplicating === resource.id ? 'Duplicating...' : 'Duplicate'}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(resource.id)}
                      disabled={isDeleting === resource.id}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      {isDeleting === resource.id ? 'Deleting...' : 'Delete'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
